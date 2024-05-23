import { Transaction } from "sequelize";
import FileUtility from "../../services/utility_services/file_utility.service";
import { IBooking } from "./booking.interfaces";
import { FileData } from "../utility_interfaces/request.interface";

interface IFileAttributes{
    file_id: number;
    file_name: string;
    path: string;
    checked: boolean;
    owner_id: number
    date: Date;
  }


    interface IFile extends IFileAttributes{
      display(): object;

    
    }



    interface IFileRepository {

      create(file_name: string, owner_id: number, path: string, date: Date, transaction?:Transaction): Promise<IFile>;
      getFilesByAttribute(attribute:{[key: string]: any}): Promise<IFile[]>;
      getFile(file_id: number, include?:any): Promise<IFile>;    
      remove(file_id: number, transaction?:Transaction): Promise<number>;
      createFileGroupEntity(group_id: number, file_id: number, transaction?: Transaction): Promise<object>;
      removeFileGroupEntity(group_id: number, file_id: number): Promise<object>;
      getFileGroupEntity(group_id: number, attributes: string[]): Promise<object>;
      checkFileGroupEntity(group_id: number, file_id: number): Promise<object>;
      getFilesByLike(likeAttribute: { [key: string]: any }, filters: { [key: string]: any }): Promise<object[]>;    
      update(file_id: number, data: object, transaction?: Transaction): Promise<void>;
   

    
    }
    
    interface IFileService {   
        fileOperations: FileUtility;
        fileRepository: IFileRepository;
        createFile(ownerId: number, fileDate: FileData, groupId: number): Promise<IFile>;
        index(groupId: number, userId: number): Promise<IFile[]>;
        getFile(fileId: number): Promise<IFile>;    
        deleteFile(fileId: number, groupId: number, ownerId: number): Promise<number>;    
        checkFileInGroup(groupId: number, fileId: number): Promise<boolean>;
        searchForFile(fileName: string, groupId: number, userId: number): Promise<object[]>;
        checkIn(userId: number, groupId: number, fileIds: string): Promise<object>;
        checkOut(userId: number, fileId: number): Promise<IBooking>;
        getBookingHistory(userId: number, groupId:number, fileId: number): Promise<IBooking[]>;
        updateFile(userId: number, fileId: number, fileDate: FileData): Promise<IFile>;
        getArchivedFiles(userId: number, groupId: number, fileId: number): Promise<any>;

    }



export {IFileAttributes, IFile, IFileRepository, IFileService}


