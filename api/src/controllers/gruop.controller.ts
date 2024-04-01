import { Request, Response } from "express";
import GruopServices from "../services/business _services/group.services";
import UserAuth from "../middlewares/authMiddleware/user.auth";

class GroupController{

private groupServices: GruopServices;
private userAuth: UserAuth;


constructor(){
    this.groupServices = new GruopServices();
    this.userAuth = new UserAuth();

}

async createGroup(req: Request, res: Response){

    try {
        
        
    const {group_name, is_public} = req.body;

    const token = req.headers.authorization;

    const user = await this.userAuth.getUser(token as string);

    const data = await this.groupServices.createGroup(group_name, user.user_id, is_public);

    const group = data.display();

    res.status(201).send(`group ${group.group_name} has been created By ${user.user_name}`);
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}

async getMyGroups(req: Request, res: Response){

    try {
        
        

    const token = req.headers.authorization;

    const user = await this.userAuth.getUser(token as string);

    const groups = await this.groupServices.index(user.user_id);

    res.status(200).send(groups);
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}


async deleteGroup(req: Request, res: Response){

    try {
        
        
        const group_id = req.params.group_id;

    const token = req.headers.authorization;

    const user = await this.userAuth.getUser(token as string);


     await this.groupServices.deleteGroup(group_id);


    res.status(200).send("Group Has Been Deleted.");
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}

}

export default GroupController;