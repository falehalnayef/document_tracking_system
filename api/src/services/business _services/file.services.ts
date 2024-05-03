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
class FileServices implements IFileService {
    private fileRepository: IFileRepository;
    private validator: IValidator;
    private groupServices: IGroupService;
    public fileOperations: FileUtility;
    constructor(fileRepository: IFileRepository, validator: IValidator, groupServices: IGroupService) {
        this.fileRepository = fileRepository;
        this.validator = validator;
        this.groupServices = groupServices;
        this.fileOperations = new FileUtility();


    }
    async index(groupId: number, userId: number): Promise<IFile[]> {
        this.validator.validateRequiredFields({ groupId, userId });

        const check = this.groupServices.checkUserInGroup(groupId, userId);
        if (!check) {
            throw new StatusError(403, "Not allowed");
        }

        const fileIDsData: IFile[] = await this.fileRepository.getFileGroupEntity(groupId, ["fileId"]) as IFile[];

        const fileId: number[] = fileIDsData.map(v => v.file_id);

        const fileData = await this.fileRepository.getFilesByAttribute({fileId});


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

        const check = this.groupServices.checkUserInGroup(groupId, userId);
        if (!check) {
            throw new StatusError(403, "Not allowed");
        }



        const fileIDsData: IFile[] = await this.fileRepository.getFileGroupEntity(groupId, ["fileId"]) as IFile[];

        const fileId: number[] = fileIDsData.map(v => v.file_id);

        const fileData = await this.fileRepository.getFilesByLike({file_name:fileName}, {fileId});

        const files: IFile[] = [];
        for (const file of fileData) {
          files.push(new File(file as IFile));
        }

        return files;   
    }

    async deleteFile(fileId: number, groupId: number, ownerId: number): Promise<number> {

        this.validator.validateRequiredFields({ fileId, groupId, ownerId });

        const check = await this.checkFileInGroup(groupId, fileId);
        if (!check) {
            throw new StatusError(400, "File is not in the group.");
        }
        const group = await this.groupServices.getGroup(groupId);
        if (group.owner_id !== ownerId) {
            throw new StatusError(403, "Not allowed.");
        }
        const file = await this.getFile(fileId);

       await this.fileOperations.deleteFile(file.path);
        
        const removedFile = await this.fileRepository.remove(fileId);
        if (removedFile !== 1) {
            throw new StatusError(500, "File is not deleted.");
        }



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

    


    async createFile(ownerId: number, isPublic: boolean, fileData: FileData, groupId: number): Promise<IFile> {
        this.validator.validateRequiredFields({ fileData, ownerId, isPublic });


       const group = await this.groupServices.getGroup(groupId);

       if (group.owner_id != ownerId) {

        throw new StatusError(403, "Not allowed");
       }
    

       const filePath = await this.fileOperations.save(fileData.data!, fileData.fileName);
        let file;
        await db.sequelize.transaction(async (t: Transaction) => {
         file = await this.fileRepository.create(fileData.fileName, ownerId, isPublic, filePath, new Date(), t);

        await this.fileRepository.createFileGroupEntity(groupId, file.file_id, t);

       });
        
        
        return file!;
    }

  

   
}




export default FileServices;
