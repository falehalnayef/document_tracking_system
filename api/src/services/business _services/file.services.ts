import { IFile, IFileRepository, IFileService } from "../../interfaces/business_interfaces/file.interfaces.js";
import { FileData } from "../../interfaces/utility_interfaces/request.interface.js";
import IValidator from "../../interfaces/utility_interfaces/validator.interface.js";
import path, { dirname } from "path";

import FileUtility from "../utility_services/file_utility.service.js"
import {IGroupService } from "../../interfaces/business_interfaces/group.interfaces.js";

import File from "../../dto/file";
import StatusError from "../../utils/error.js";
import db from "../../data/database/db.js";
import { Transaction } from "sequelize";
import { IBooking } from "../../interfaces/business_interfaces/booking.interfaces.js";
import Booking from "../../dto/booking.js";
class FileServices implements IFileService {
    private fileRepository: IFileRepository;
    private validator: IValidator;
    private groupServices: IGroupService;
    public fileOperations: FileUtility;
    expirationTime: number;
    constructor(fileRepository: IFileRepository, validator: IValidator, groupServices: IGroupService, expirationTime: number = 3 * 24 * 60 * 60 * 1000) {
        this.fileRepository = fileRepository;
        this.validator = validator;
        this.groupServices = groupServices;
        this.fileOperations = new FileUtility();
        this.expirationTime = expirationTime;


    }
    async getBookingHistory(userId: number, groupId:number, fileId: number): Promise<IBooking[]> {

        const isOwner = await this.groupServices.isOwner(userId, groupId);
        const check = await this.groupServices.checkUserInGroup(groupId, userId);

        if (!check && !isOwner) {
            throw new StatusError(403, "Not allowed");
        }

        const bookingsData = await this.fileRepository.getBookings(fileId);

        const bookings: IBooking[] = [];
        for (const book of bookingsData) {
            bookings.push(new Booking(book as IBooking));
        }

        return bookings;
    }
    async index(groupId: number, userId: number): Promise<IFile[]> {
        this.validator.validateRequiredFields({ groupId, userId });
        
        const isOwner = await this.groupServices.isOwner(userId, groupId);
        const check = await this.groupServices.checkUserInGroup(groupId, userId);

        if (!check && !isOwner) {
            throw new StatusError(403, "Not allowed");
        }

        const fileIDsData: IFile[] = await this.fileRepository.getFileGroupEntity(groupId, ["file_id"]) as IFile[];

        const file_id: number[] = fileIDsData.map(v => v.file_id);

        const fileData = await this.fileRepository.getFilesByAttribute({file_id});


        const files: IFile[] = [];
        for (const file of fileData) {
          files.push(new File(file as IFile));
        }

        return files;       
    }

    async checkFileInGroup(groupId: number, fileId: number): Promise<boolean> {

        const userInGroup = await this.fileRepository.checkFileGroupEntity(groupId, fileId);
        return !!userInGroup;
    }

    async searchForFile(fileName: string, groupId: number, userId: number): Promise<object[]>{
        this.validator.validateRequiredFields({ fileName, groupId, userId });

        

        const isOwner = await this.groupServices.isOwner(userId, groupId);
        const check = await this.groupServices.checkUserInGroup(groupId, userId);

        if (!check && !isOwner) {
            throw new StatusError(403, "Not allowed");
        }


        const fileIDsData: IFile[] = await this.fileRepository.getFileGroupEntity(groupId, ["file_id"]) as IFile[];

        const file_id: number[] = fileIDsData.map(v => v.file_id);

        const fileData = await this.fileRepository.getFilesByLike({file_name:fileName}, {file_id});

        const files: IFile[] = [];
        for (const file of fileData) {
          files.push(new File(file as IFile));
        }

        return files;   
    }

    async deleteFile(fileId: number, groupId: number, ownerId: number): Promise<number> {

        this.validator.validateRequiredFields({ fileId, groupId, ownerId });

        
        const isOwner = await this.groupServices.isOwner(ownerId, groupId);

       if (!isOwner) {

        throw new StatusError(403, "Not allowed");
       }
    
        const check = await this.checkFileInGroup(groupId, fileId);
        if (!check) {
            throw new StatusError(400, "File is not in the group.");
        }
      
        const file = await this.getFile(fileId);

       const del = this.fileOperations.deleteFile(file.path);
        
        const removedFile = await this.fileRepository.remove(fileId);
        if (removedFile !== 1) {
            throw new StatusError(500, "File is not deleted.");
        }

        await del;

        return removedFile;  
      }


      async getFile(fileId: number): Promise<IFile> {
        this.validator.validateRequiredFields({ fileId });

        const file = await this.fileRepository.getFile(fileId);
        if (!file) {
            throw new StatusError(404, "File not found.");
        }
        return new File(file);
    }

    


    async createFile(ownerId: number, fileData: FileData, groupId: number): Promise<IFile> {
        this.validator.validateRequiredFields({ fileData, ownerId });

        const isOwner = await this.groupServices.isOwner(ownerId, groupId);


       if (!isOwner) {

        throw new StatusError(403, "Not allowed");
       }
    

       const filePath = await this.fileOperations.save(fileData.data!, fileData.fileName);
        let file;
        await db.sequelize.transaction(async (t: Transaction) => {
         file = await this.fileRepository.create(fileData.fileName, ownerId, filePath, new Date(), t);

        await this.fileRepository.createFileGroupEntity(groupId, file.file_id, t);

       });
        
        
        return file!;
    }


    async checkIn(userId: number, groupId: number, Ids: string): Promise<object> {
        this.validator.validateRequiredFields({ Ids, groupId, userId });
    
        const fileIds = Ids.split(",");
        const files = this.fileRepository.getFilesByAttribute({ file_id: fileIds});

        const isOwner = await this.groupServices.isOwner(userId, groupId);
        const isCheckedIn = await this.groupServices.checkUserInGroup(groupId, userId);
    
        if (!isOwner && !isCheckedIn) {
            throw new StatusError(403, "Not allowed");
        }
    
        const expiredAt = new Date(Date.now() + this.expirationTime);
        let bookedFiles: object[] = [];
    
        await db.sequelize.transaction(async (t: Transaction) => {
            for (let file of await files) {
    
                const check = await this.fileRepository.checkFileGroupEntity(groupId, file.file_id);
                if (!check) {
                    throw new StatusError(404, `File with ID ${file.file_id} not found in the group ${groupId}`);
                }
    
                if (file.checked) {
                    throw new StatusError(400, `File ${file.file_id} is already checked.`);
                }
    
                const booking = await this.fileRepository.createBooking(file.file_id, userId, new Date(), expiredAt, t);
                await this.fileRepository.update(file.file_id, { checked: true }, t);
                bookedFiles.push(booking);
            }
        });
    
        

    
        return bookedFiles;
    }
    


    async checkOut(userId: number, fileId: number): Promise<IBooking>{

        this.validator.validateRequiredFields({ fileId, userId });

        const bookedFileEntity = await this.fileRepository.getActiveBooking(userId, fileId);

        if(!bookedFileEntity){
            throw new StatusError(400, "You did not check this file");
        }

        await db.sequelize.transaction(async (t: Transaction) => {
            await this.fileRepository.updateBooking(bookedFileEntity.booking_id, {check_out_date: new Date()}, t);
            await this.fileRepository.update(fileId, {checked:false}, t)
        });

        return bookedFileEntity!;

    }
}




export default FileServices;
