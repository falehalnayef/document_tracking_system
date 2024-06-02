import busboy from "busboy";
import AuthenticatedRequest, {
  FileData,
} from "../../interfaces/utility_interfaces/request.interface.js";
import { Response, NextFunction } from "express";
import StatusError from "../../utils/error.js";

class MultipartMiddleware {
  static allowedMimeTypes = ["application/pdf", "application/msword"];
  static allowedSizeInBytes = 10 * 1024 * 1024;

  handleFileUpload(
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ) {
    const bb = busboy({ headers: req.headers });

    let fileData: FileData;

    bb.on("field", (fieldname, value) => {
      req.body[fieldname] = value;
    });

    bb.on("file", (fieldName: string, file: any, info: any) => {
      fileData = {
        fieldName,
        fileName: info.filename,
        encoding: info.encoding,
        mimetype: info.mimeType,
      };

      const chunks: Buffer[] = [];
      file
        .on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        })
        .on("end", () => {
          const buffer = Buffer.concat(chunks);

          fileData.data = buffer;
          if (
            fileData &&
            !MultipartMiddleware.allowedMimeTypes.includes(fileData.mimetype)
          ) {
            next(
              new StatusError(
                400,
                "File type not allowed, the allowed types are pdf, ms word"
              )
            );

            return;
          }

          const fileSize = fileData ? fileData.data?.length : 0;
          if (fileSize && fileSize > MultipartMiddleware.allowedSizeInBytes) {
            next(new StatusError(400, "File size exceeds limit"));

            return;
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
      next(new StatusError(500, error.message));
      return;
    });
    req.pipe(bb);
  }
}

export default MultipartMiddleware;
