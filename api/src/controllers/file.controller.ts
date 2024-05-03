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

            const {isPublic, groupId} = req.body;

            const ownerId = req.userId!;
            const fileData = req.file;


       file = await this.fileServices.createFile(ownerId, isPublic, fileData, groupId);



        res.status(201).send(successfulResponse("File is uploaded.", file.display));

            
        } catch (error: any) {
            
            if (error instanceof ValidationError || error.name === "SequelizeDatabaseError") error.statusCode = 400;

            if(file) await this.fileServices.fileOperations.deleteFile(file.path);


            next(error);
            
        }
        

    }


    async index(req: AuthenticatedRequest, res: Response, next: NextFunction){
        try {

            const {groupId} = req.body;

            const userId = req.userId!;

      const files = await this.fileServices.index(groupId, userId);



        res.status(201).send(successfulResponse("Files.", files));

            
        } catch (error: any) {
        
            next(error);
            
        }
        

    }

    async deleteFile(req: AuthenticatedRequest, res: Response, next: NextFunction){

        try {
            
            
            const {groupId} = req.body;
            const fileId = req.params.fileId as unknown as number;

    
            const ownerId = req.userId!;
    
         await this.fileServices.deleteFile(fileId, groupId, ownerId);
    
    
        res.status(200).send(successfulResponse("File has been deleted."));
                
    } catch (error: any) {
        
                
        next(error);}
        
    }



}



export default FileController;


