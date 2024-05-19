import { IArchive} from "../interfaces/business_interfaces/archive.interfaces";

class ArchivedFile implements IArchive{
    
    archive_id: number;
    file_id: number;
    user_id: number;
    path: string;
    date: Date;

    constructor(file: IArchive) {
        this.archive_id = file.archive_id;
        this.file_id = file.file_id;
        this.user_id = file.user_id;
        this.path = file.path;  
        this.date = file.date;    
     }
    

     display(): object {
        return this;
    }
}

export default File;
