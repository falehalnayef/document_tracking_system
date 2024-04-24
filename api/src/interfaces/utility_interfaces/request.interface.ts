import { Request } from "express";

export type FileData = {
    fieldName: string;
    fileName: any;
    encoding: string;
    mimetype: string;
    ext?: string;
    data?: Buffer;
  };

interface AuthenticatedRequest extends Request {
    userId?: number;
    userName?: string;
    file?: FileData;
}

export default AuthenticatedRequest;