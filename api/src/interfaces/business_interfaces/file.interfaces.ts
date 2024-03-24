interface IFileAttributes{
    file_id: Number;
    file_name: String;
    path: String;
    public: Boolean;
    checked: Boolean;
    owner_id: Number
    date: Date;
  }


    interface IFile extends IFileAttributes{

    
    }






export {IFileAttributes, IFile}


