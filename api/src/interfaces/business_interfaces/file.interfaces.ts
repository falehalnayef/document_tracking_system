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
        createFile(ownerId: number, isPublic: boolean, fileDate: any, group_id: number): Promise<IFile>;
         index(group_id: number, user_id: number): Promise<IFile[]>;
         getFile(file_id: number): Promise<IFile>;    
         deleteFile(file_id: number, group_id: number, owner_id: number): Promise<number>;    
             checkFileInGroup(group_id: number, file_id: number): Promise<boolean>

    }


 
export {IFileAttributes, IFile, IFileRepository, IFileService}


