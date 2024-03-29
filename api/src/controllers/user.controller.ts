import { ValidationError } from "sequelize";
import UserServices from "../services/business _services/user.services";

import { Request, Response} from "express";

class UserController {

    private userServices: UserServices;

    constructor(){
        this.userServices = new UserServices();
    }

    async createUser(req: Request, res: Response){

        try {

            const {user_name, email, password} = req.body;

        const user = await this.userServices.register(user_name, email, password);



        res.send(user.display());
            
        } catch (error: any) {
            
            let statusCode = error.statusCode || 500;

            if (error instanceof ValidationError || error.name==="SequelizeDatabaseError") statusCode = 400;

            res.status(statusCode).json(error.message);
        }
        

    }
}



export default UserController;