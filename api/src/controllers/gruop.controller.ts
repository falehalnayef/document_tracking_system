import { Request, Response } from "express";
import GruopServices from "../services/business _services/group.services";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface";

class GroupController{

private groupServices: GruopServices;


constructor(){
    this.groupServices = new GruopServices();

}

async createGroup(req: AuthenticatedRequest, res: Response){

    try {
        
        
    const {group_name, is_public} = req.body;


    const user_id = req.user_id!;
    const user_name = req.user_name!;


    const group = await this.groupServices.createGroup(group_name, user_id, is_public);


    res.status(201).send(`group ${group.group_name} has been created By ${user_name}`);
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}

async getMyGroups(req: AuthenticatedRequest, res: Response){

    try {
        
    

    const user_id = req.user_id!;

    const groups = await this.groupServices.index(user_id);

    res.status(200).send(groups);
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}


async deleteGroup(req: AuthenticatedRequest, res: Response){

    try {
        
        
        const group_id = req.params.group_id as unknown as number;

        const user_id = req.user_id!;

     await this.groupServices.deleteGroup(group_id, user_id);


    res.status(200).send("Group Has Been Deleted.");
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}


async addUserToGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const {group_id, user_id} = req.body;

    const owner_id = req.user_id!;

     await this.groupServices.addUserToGroup(group_id, user_id, owner_id);

    res.status(200).send("User Has Been Added To The Group.");
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
}


async deleteUserFromGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const group_id = req.params.group_id as unknown as number;
    const user_id = req.params.user_id as unknown as number;

    const owner_id = req.user_id!;

     await this.groupServices.deleteUserFromGroup(group_id, user_id, owner_id);

    res.status(200).send("User Has Been Deleted From The Group.");
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}

async joinGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const {group_id, user_id} = req.body;

     await this.groupServices.addUserToGroup(group_id, user_id);

    res.status(200).send("User Has joined The Group.");
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
}


async leaveGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const group_id = req.params.group_id as unknown as number;
    const user_id = req.params.user_id as unknown as number;

     await this.groupServices.deleteUserFromGroup(group_id, user_id);

    res.status(200).send("User Has left The Group.");
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}
async getGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const group_id = req.params.group_id as unknown as number;

     const group = await this.groupServices.getGroup(group_id);

    res.status(200).send(group);
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).json(error.message);
}
    
}

}



export default GroupController;