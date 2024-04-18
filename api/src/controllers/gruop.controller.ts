import { Response } from "express";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface.js";
import { failedResponse, successfulResponse } from "../utils/responseMessage.js";
import { IGroupService } from "../interfaces/business_interfaces/group.interfaces.js";

class GroupController{

private groupServices: IGroupService;


constructor(groupServices: IGroupService){
    this.groupServices = groupServices;

}

async createGroup(req: AuthenticatedRequest, res: Response){

    try {
        
        
    const {group_name, is_public} = req.body;


    const user_id = req.user_id!;
    const user_name = req.user_name!;


    const group = await this.groupServices.createGroup(group_name, user_id, is_public);

    res.status(201).send(successfulResponse(`Group ${group.group_name} has been created By ${user_name}`));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
    
}

async getMyGroupsAsOwner(req: AuthenticatedRequest, res: Response){

    try {
        
    

    const user_id = req.user_id!;

    const groups = await this.groupServices.index(user_id);

    res.status(200).send(successfulResponse("Groups", groups));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
    
}


async getMyGroupsAsMember(req: AuthenticatedRequest, res: Response){

    try {
        
    

    const user_id = req.user_id!;

    const groups = await this.groupServices.indexAsAmember(user_id);

    res.status(200).send(successfulResponse("Groups", groups));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
    
}

async deleteGroup(req: AuthenticatedRequest, res: Response){

    try {
        
        
        const group_id = req.params.group_id as unknown as number;

        const user_id = req.user_id!;

     await this.groupServices.deleteGroup(group_id, user_id);


    res.status(200).send(successfulResponse("Group has been deleted."));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
    
}


async addUserToGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const {group_id, user_id} = req.body;

    const owner_id = req.user_id!;

     await this.groupServices.addUserToGroup(group_id, user_id, owner_id);

    res.status(200).send(successfulResponse("User has been added to the group."));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
}


async deleteUserFromGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const group_id = req.params.group_id as unknown as number;
    const user_id = req.params.user_id as unknown as number;

    const owner_id = req.user_id!;

     await this.groupServices.deleteUserFromGroup(group_id, user_id, owner_id);

    res.status(200).send(successfulResponse("User has been deleted from the group."));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
    
}

async joinGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const {group_id} = req.body;

    const user_id = req.user_id!;


     await this.groupServices.addUserToGroup(group_id, user_id);

    res.status(200).send(successfulResponse("Joined the group."));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
}


async leaveGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const group_id = req.params.group_id as unknown as number;

    const user_id = req.user_id!;

     await this.groupServices.deleteUserFromGroup(group_id, user_id);

    res.status(200).send(successfulResponse("Left the group."));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
    
}
async getGroup(req: AuthenticatedRequest, res: Response){

    try {
        
    const group_id = req.params.group_id as unknown as number;

     const group = await this.groupServices.getGroup(group_id);

    res.status(200).send(successfulResponse("Group", group));
            
} catch (error: any) {
    
    let statusCode = error.statusCode || 500;

    res.status(statusCode).send(failedResponse(error.message));
}
    
}

}



export default GroupController;