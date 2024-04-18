import { ValidationError } from "sequelize";
import {Response} from "express";
import {successfulResponse, failedResponse} from "../utils/responseMessage.js";
import { IFileService } from "../interfaces/business_interfaces/file.interfaces.js";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface.js";
class FileController {

    private fileServices: IFileService;

    constructor(FileServices: IFileService){
        this.fileServices = FileServices;
    }

    async createFile(req: AuthenticatedRequest, res: Response){

        try {

            const {FileNname, isPublic, password} = req.body;

            const ownerId = req.user_id!;
            const file = req.file;

        const File = await this.fileServices.createFile(FileNname, ownerId, isPublic, file);



        res.status(201).send(successfulResponse("Account is created.", File.display));

            
        } catch (error: any) {
            
            let statusCode = error.statusCode || 500;

            if (error instanceof ValidationError || error.name === "SequelizeDatabaseError") statusCode = 400;

            res.status(statusCode).send(failedResponse(error.message));
        }
        

    }



}



export default FileController;


