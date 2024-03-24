import UserServices from "../services/business _services/user.services";
import { Request, Response} from "express";

class UserController {

    private userServices: UserServices;

    constructor(){
        this.userServices = new UserServices();
    }

    async createUser(req: Request, res: Response){

        const {user_name, email, password} = req.body;

        const user = await this.userServices.register(user_name, email, password);

        res.send(user.display());

    }
}



export default UserController;