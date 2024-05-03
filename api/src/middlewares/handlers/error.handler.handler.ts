import { NextFunction, Response } from "express";
import AuthenticatedRequest from "../../interfaces/utility_interfaces/request.interface";
import { failedResponse } from "../../utils/responseMessage";

  export default (err: any, _req: AuthenticatedRequest, res: Response, next: NextFunction) =>{

    if(!err) return next();
    console.error("Error caught by error handler:", err);
    const status = err.statusCode || 500;
    res.status(status).send(failedResponse(err.message));

  }
