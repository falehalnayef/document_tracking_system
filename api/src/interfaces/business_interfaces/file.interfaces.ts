import FileUtility from "../../services/utility_services/file_utility.service";

interface IFileAttributes{
    file_id: number;
    file_name: string;
    path: string;
    is_public: boolean;
    checked: boolean;
    owner_id: number
    date: Date;
  }


    interface IFile extends IFileAttributes{
      display(): object;

    
    }



    interface IFileRepository {

      create(file_name: string, owner_id: number, is_public: boolean, path: string, date: Date): Promise<IFile>;
       getFilesByAttribute(attribute:{[key: string]: any}): Promise<object[]>;
       getFile(file_id: number): Promise<IFile>;    
       remove(file_id: number): Promise<number>;

      createFileGroupEntity(group_id: number, file_id: number): Promise<object>
      removeFileGroupEntity(group_id: number, file_id: number): Promise<object>
      getFileGroupEntity(group_id: number, attributes: string[]): Promise<object>
      checkFileGroupEntity(group_id: number, file_id: number): Promise<object>

    
    }
    
    interface IFileService {   
        fileOperations: FileUtility;
        createFile(ownerId: number, isPublic: boolean, fileDate: any, groupId: number): Promise<IFile>;
         index(groupId: number, userId: number): Promise<IFile[]>;
         getFile(fileId: number): Promise<IFile>;    
         deleteFile(fileId: number, groupId: number, ownerId: number): Promise<number>;    
             checkFileInGroup(groupId: number, fileId: number): Promise<boolean>

    }


 
export {IFileAttributes, IFile, IFileRepository, IFileService}


