import * as fs from "fs";
import busboy from "busboy";
import { fileTypeFromBuffer } from "file-type"; // Use the correct import
import AuthenticatedRequest, { FileData } from "../../interfaces/utility_interfaces/request.interface.js";
import { Response, NextFunction } from "express";
import StatusError from "../../utils/error.js";
import { failedResponse } from "../../utils/responseMessage.js";



class MultipartMiddleware {

 static allowedMimeTypes = ["application/pdf", "video/mp4"];
 static allowedSizeInBytes = 10 * 1024 * 1024; 


  async handleFileUpload(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {

    try {
        const bb = busboy({ headers: req.headers });

        let file_data: FileData;

        bb.on("file", async (fieldname: string, file: any, info: any) => {
          file_data = {
            fieldname,
            filename: info.filename,
            encoding: info.encoding,
            mimetype: info.mimeType,
          };
    
          const chunks: Buffer[] = [];
          file
            .on("data", (chunk: Buffer) => {
              chunks.push(chunk);
            })
            .on("end", async () => {
              const buffer = Buffer.concat(chunks);
              const type = await fileTypeFromBuffer(buffer);
              if (type) {
                file_data.ext = type.ext;
              }
              file_data.data = buffer;
    
              if (file_data && !MultipartMiddleware.allowedMimeTypes.includes(file_data.mimetype)) {
                throw new StatusError(400, "File type not allowed");
              }
    
              const fileSize = file_data ? file_data.data?.length : 0;
              if (fileSize && fileSize > MultipartMiddleware.allowedSizeInBytes) {
                throw new StatusError(400, "File size exceeds limit");

              }
            });
        });
    
        bb.on("finish", () => {
          if (file_data) {
            req.file = file_data;
          }
          next();
        });
    
        bb.on("error", (error: any) => {
          console.error();
          throw new StatusError(500, error.message);

          
    
        });
        req.pipe(bb);
    } catch (error: any) {

        const status = error.status || 500;
        res.status(status).send(failedResponse(error.message));

    }
   
  }
}



export default MultipartMiddleware;
