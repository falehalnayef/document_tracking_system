import fs from 'fs';
import path from 'path';


class FileUtility {

   createDir(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      try {
        fs.mkdirSync(dirPath, { recursive: true });
      } catch (error) {
        throw error;
      }
    }
  }
   save(buffer: Buffer, saveTo: string) {
    const directoryPath = path.dirname(saveTo);
  
  
    this.createDir(directoryPath);
  
        fs.writeFileSync(saveTo, buffer);
  }
  


 deleteFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

}

  export default FileUtility;