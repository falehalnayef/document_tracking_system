interface IArchiveAttributes{
    archive_id: number;
    file_id: number;
    user_id: number;
    path: string;
    date: Date;
    }


    interface IArchive extends IArchiveAttributes{

    
    }







export {IArchiveAttributes, IArchive}


