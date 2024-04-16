import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user_id?: number;
    user_name?: string;
    file?: any;
}

export default AuthenticatedRequest;