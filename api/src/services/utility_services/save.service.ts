
import fs from "fs";


async function save(buffer: Buffer, saveTo: string) {
    return new Promise<void>((resolve, reject) => {
      try {
        fs.writeFile(saveTo, buffer, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  
  export default save;