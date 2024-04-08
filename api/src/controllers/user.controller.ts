import { ValidationError } from "sequelize";
import UserServices from "../services/business _services/user.services";

import { Request, Response} from "express";
import {successfulResponse, failedResponse} from "../utils/responseMessage";
class UserController {

    private userServices: UserServices;

    constructor(){
        this.userServices = new UserServices();
    }

    async createUser(req: Request, res: Response){

        try {

            const {user_name, email, password} = req.body;


        const user = await this.userServices.register(user_name, email, password);



        res.status(201).send(successfulResponse("Account is created.", user.display));

            
        } catch (error: any) {
            
            let statusCode = error.statusCode || 500;

            if (error instanceof ValidationError || error.name === "SequelizeDatabaseError") statusCode = 400;

            res.status(statusCode).send(failedResponse(error.message));
        }
        

    }


    async login(req: Request, res: Response){

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


