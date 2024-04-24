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

            const {isPublic, group_id} = req.body;

            const ownerId = req.user_id!;
            const fileData = req.file;


       file = await this.fileServices.createFile(ownerId, isPublic, fileData, group_id);



        res.status(201).send(successfulResponse("File is uploaded.", file.display));

            
        } catch (error: any) {
            
            if (error instanceof ValidationError || error.name === "SequelizeDatabaseError") error.statusCode = 400;

            if(file) this.fileServices.fileOperations.deleteFile(file.path);


            next(error);
            
        }
        

    }


    async index(req: AuthenticatedRequest, res: Response, next: NextFunction){
        try {

            const {group_id} = req.body;

            const user_id = req.user_id!;

      const files = await this.fileServices.index(group_id, user_id);



        res.status(201).send(successfulResponse("Files.", files));

            
        } catch (error: any) {
        
            next(error);
            
        }
        

    }

    async deleteFile(req: AuthenticatedRequest, res: Response, next: NextFunction){

        try {
            
            
            const {group_id} = req.body;
            const file_id = req.params.file_id as unknown as number;

    
            const owner_id = req.user_id!;
    
         await this.fileServices.deleteFile(file_id, group_id, owner_id);
    
    
        res.status(200).send(successfulResponse("File has been deleted."));
                
    } catch (error: any) {
        
                
        next(error);}
        
    }



}



export default FileController;


