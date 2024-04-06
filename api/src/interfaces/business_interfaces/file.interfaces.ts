interface IFileAttributes{
    file_id: number;
    file_name: string;
    path: string;
    public: boolean;
    checked: boolean;
    owner_id: number
    date: Date;
  }


    interface IFile extends IFileAttributes{

    
    }






export {IFileAttributes, IFile}


