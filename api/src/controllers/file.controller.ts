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

        let file;
        try {

            const {isPublic} = req.body;

            const ownerId = req.user_id!;
            const fileDate = req.file;

       file = await this.fileServices.createFile(ownerId, isPublic, fileDate);



        res.status(201).send(successfulResponse("File is created.", file.display));

            
        } catch (error: any) {
            
            let statusCode = error.statusCode || 500;

            if (error instanceof ValidationError || error.name === "SequelizeDatabaseError") statusCode = 400;

            if(file) this.fileServices.fileOperations.deleteFile(file.path);
            
            res.status(statusCode).send(failedResponse(error.message));
        }
        

    }





}



export default FileController;


