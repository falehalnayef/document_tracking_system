import { ValidationError } from "sequelize";
import {Response} from "express";
import {successfulResponse, failedResponse} from "../utils/responseMessage";
import { IUserService } from "../interfaces/business_interfaces/user.interfaces";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface";
class UserController {

    private userServices: IUserService;

    constructor(userServices: IUserService){
        this.userServices = userServices;
    }

    async createUser(req: AuthenticatedRequest, res: Response){

        try {

            console.log("SFsfs")
            const {user_name, email, password} = req.body;


        const user = await this.userServices.register(user_name, email, password);



        res.status(201).send(successfulResponse("Account is created.", user.display));

            
        } catch (error: any) {
            
            let statusCode = error.statusCode || 500;

            if (error instanceof ValidationError || error.name === "SequelizeDatabaseError") statusCode = 400;

            res.status(statusCode).send(failedResponse(error.message));
        }
        

    }


    async login(req: AuthenticatedRequest, res: Response){

        try {

            const {email, password} = req.body;

        const user = await this.userServices.login(email, password);


        res.status(200).send(successfulResponse("Logged in", user.display()));

            
        } catch (error: any) {
            
            let statusCode = error.statusCode || 500;

            res.status(statusCode).send(failedResponse(error.message));
        }
        

    }
}



export default UserController;


