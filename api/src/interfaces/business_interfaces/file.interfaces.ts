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

      create(File_name: string, owner_id: number, is_public: boolean, path: string, date: Date): Promise<IFile>;
      // getFilesByAttribute(attribute:{[key: string]: any}): Promise<object[]>;
      // getFile(File_id: number): Promise<IFile>;    
      // remove(File_id: number): Promise<number>;
 
    
    }
    
    interface IFileService {   
        fileOperations: FileUtility;
        createFile(ownerId: number, isPublic: boolean, fileDate: any): Promise<IFile>;
        // index(owner_id: number): Promise<IFile[]>;
        // getFile(File_id: number): Promise<IFile>;    
        // deleteFile(File_id: number, user_id: number): Promise<number>;    
    }


 
export {IFileAttributes, IFile, IFileRepository, IFileService}


