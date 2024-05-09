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
class FileServices implements IFileService {
    private fileRepository: IFileRepository;
    private validator: IValidator;
    private groupServices: IGroupService;
    public fileOperations: FileUtility;
    expirationTime: number;
    constructor(fileRepository: IFileRepository, validator: IValidator, groupServices: IGroupService, expirationTime: number =  5 * 60 * 1000) {
        this.fileRepository = fileRepository;
        this.validator = validator;
        this.groupServices = groupServices;
        this.fileOperations = new FileUtility();
        this.expirationTime = expirationTime;


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


    async bookFile(userId: number, groupId: number, fileId: number): Promise<object>{


        this.validator.validateRequiredFields({ fileId, groupId, userId });

        const checkFile = this.checkFileInGroup(groupId, fileId);

        const isOwner = this.groupServices.isOwner(userId, groupId);
        const check = this.groupServices.checkUserInGroup(groupId, userId);

        const file = this.getFile(fileId);

        if (!(await check) && !(await isOwner)) {
            throw new StatusError(403, "Not allowed");
        }

        if (!(await checkFile)) {
            throw new StatusError(400, "File is not in the group.");
        }

    
        if ((await file).checked) {

            throw new StatusError(400, "File is checked.");

        }

        const expiredAt = new Date(new Date().getTime() + this.expirationTime);

        let booked;
        await db.sequelize.transaction(async (t: Transaction) => {
            booked = await this.fileRepository.createBooking(fileId, userId, new Date(), expiredAt, t);
            await this.fileRepository.update(fileId, {checked:true}, t)
        });

        return booked!;

    }
}




export default FileServices;
