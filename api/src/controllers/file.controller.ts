import { ValidationError } from "sequelize";
import {NextFunction, Response} from "express";
import {successfulResponse, failedResponse} from "../utils/responseMessage.js";
import { IFileService } from "../interfaces/business_interfaces/file.interfaces.js";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface.js";

class FileController {

    private fileServices: IFileService;


    constructor(FileServices: IFileService){
        this.fileServices = FileServices;
    }

    async createFile(req: AuthenticatedRequest, res: Response, next: NextFunction){

        let file;
        try {

            const {isPublic} = req.body;

            const ownerId = req.user_id!;
            const fileData = req.file;


       file = await this.fileServices.createFile(ownerId, isPublic, fileData);



        res.status(201).send(successfulResponse("File is uploaded.", file.display));

            
        } catch (error: any) {
            
            if (error instanceof ValidationError || error.name === "SequelizeDatabaseError") error.statusCode = 400;

            if(file) this.fileServices.fileOperations.deleteFile(file.path);


            next(error);
            
        }
        

    }





}



export default FileController;


