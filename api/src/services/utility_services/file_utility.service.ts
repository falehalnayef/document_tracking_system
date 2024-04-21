import fs from 'fs';
import path from 'path';


class FileUtility {

   createDir(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      console.log('Creating directory...');
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log('Directory created successfully.');
      } catch (error) {
        console.error('Error creating directory:', error);
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