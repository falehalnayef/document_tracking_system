import { Request } from "express";

export type FileData = {
    fieldname: string;
    filename: any;
    encoding: string;
    mimetype: string;
    ext?: string;
    data?: Buffer;
  };

interface AuthenticatedRequest extends Request {
    user_id?: number;
    user_name?: string;
    file?: FileData;
}

export default AuthenticatedRequest;