import busboy from "busboy";
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

        let fileData: FileData;

        bb.on('field', (fieldname, value) => {
          req.body[fieldname] = value;
      })

        bb.on("file", async (fieldname: string, file: any, info: any) => {
          fileData = {
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
          
              fileData.data = buffer;
    
              if (fileData && !MultipartMiddleware.allowedMimeTypes.includes(fileData.mimetype)) {
                throw new StatusError(400, "File type not allowed");
              }
    
              const fileSize = fileData ? fileData.data?.length : 0;
              if (fileSize && fileSize > MultipartMiddleware.allowedSizeInBytes) {
                throw new StatusError(400, "File size exceeds limit");

              }
            });
        });
    
        bb.on("finish", () => {
          if (fileData) {
            req.file = fileData;
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
