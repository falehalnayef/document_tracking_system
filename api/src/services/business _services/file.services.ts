import { IFile, IFileRepository, IFileService } from "../../interfaces/business_interfaces/file.interfaces.js";
import { FileData } from "../../interfaces/utility_interfaces/request.interface.js";
import IValidator from "../../interfaces/utility_interfaces/validator.interface.js";
import path, { dirname } from "path";

import FileUtility from "../utility_services/file_utility.service.js"
import {IGroupService } from "../../interfaces/business_interfaces/group.interfaces.js";

import File from "../../dto/file";
import StatusError from "../../utils/error.js";
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
    async index(group_id: number, user_id: number): Promise<IFile[]> {
        this.validator.validateRequiredFields({ group_id, user_id });

        const check = this.groupServices.checkUserInGroup(group_id, user_id);
        if (!check) {
            throw new StatusError(403, "Not allowed");
        }

        const fileIDsData: IFile[] = await this.fileRepository.getFileGroupEntity(group_id, ["file_id"]) as IFile[];

        const file_id: number[] = fileIDsData.map(v => v.file_id);

        const fileData = await this.fileRepository.getFilesByAttribute({file_id});


        const files: IFile[] = [];
        for (const file of fileData) {
          files.push(new File(file as IFile));
        }

        return files;       
    }

    async checkFileInGroup(group_id: number, file_id: number): Promise<boolean> {

        const userInGroup = await this.fileRepository.checkFileGroupEntity(group_id, file_id);
        return !!userInGroup;
    }


    async deleteFile(file_id: number, group_id: number, owner_id: number): Promise<number> {

        this.validator.validateRequiredFields({ file_id, group_id, owner_id });

        const check = await this.checkFileInGroup(group_id, file_id);
        if (!check) {
            throw new StatusError(400, "File is not in the group.");
        }
        const group = await this.groupServices.getGroup(group_id);
        if (group.owner_id !== owner_id) {
            throw new StatusError(403, "Not allowed.");
        }
        const removedFile = await this.fileRepository.remove(file_id);
        if (removedFile !== 1) {
            throw new StatusError(500, "File is not deleted.");
        }

        return removedFile;  
      }


      async getFile(file_id: number): Promise<IFile> {
        this.validator.validateRequiredFields({ file_id });

        const file = await this.fileRepository.getFile(file_id);
        if (!file) {
            throw new StatusError(404, "File not found.");
        }
        return new File(file);
    }

    


    async createFile(ownerId: number, isPublic: boolean, fileData: FileData, group_id: number): Promise<IFile> {
        this.validator.validateRequiredFields({ fileData, ownerId, isPublic });


       const group = await this.groupServices.getGroup(group_id);

       if (group.owner_id != ownerId) {

        throw new StatusError(403, "Not allowed");
       }


        const newFileName = fileData.filename;
        const filePath = path.join(__dirname.split("api")[0], "uploads/", newFileName);

        this.fileOperations.save(fileData.data!, filePath);

        const file = await this.fileRepository.create(newFileName, ownerId, isPublic, filePath, new Date());

        await this.fileRepository.createFileGroupEntity(group_id, file.file_id);
        
        return file;
    }

  

   
}




export default FileServices;
