import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user_id?: number;
    user_name?: string
}

export default AuthenticatedRequest;