import { IFile } from "../interfaces/business_interfaces/file.interfaces.js";

class File implements IFile {
  file_id: number;
  file_name: string;
  path: string;
  checked: boolean;
  owner_id: number;
  date: Date;

  constructor(file: IFile) {
    this.file_id = file.file_id;
    this.file_name = file.file_name;
    this.owner_id = file.owner_id;
    this.path = file.path;
    this.checked = file.checked;
    this.date = file.date;
  }

  display(): object {
    return this;
  }
}

export default File;
