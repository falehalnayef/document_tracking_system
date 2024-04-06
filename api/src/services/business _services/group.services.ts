import GroupRepository from "../../data/repositories/group.repository";
import Group from "../../dto/group";
import { IGroup, IGroupService } from "../../interfaces/business_interfaces/group.interfaces";
import StatusError from "../../utils/error";
import Validator from "../../validation/validators";

class GroupServices implements IGroupService {
    private groupRepository: GroupRepository;
    private validator: Validator;

    constructor() {
        this.groupRepository = new GroupRepository();
        this.validator = new Validator();

    }

    async createGroup(groupName: string, ownerId: number, isPublic: boolean): Promise<IGroup> {
        this.validator.validateRequiredFields({ groupName, ownerId });

        const group = await this.groupRepository.create(groupName, ownerId, isPublic);
        return new Group(group);
    }

    async index(owner_id: number): Promise<IGroup> {
        if (!owner_id) throw new StatusError(400, "Owner ID Is Required.");
         
        const groups = await this.groupRepository.getGroupsByOwnerID(owner_id);
    
        return new Group(groups);   
    }

    async getGroup(groupId: number): Promise<IGroup> {
        this.validator.validateRequiredFields({ groupId });

        const group = await this.groupRepository.getGroup(groupId);
        if (!group) {
            throw new StatusError(404, "Group not found.");
        }
        return new Group(group);
    }

    async deleteGroup(groupId: number, userId: number): Promise<number> {
        this.validator.validateRequiredFields({ groupId, userId });

        const group = await this.getGroup(groupId);
        if (group.owner_id !== userId) {
            throw new StatusError(403, "Not allowed.");
        }

        const removedGroup = await this.groupRepository.remove(groupId);
        if (removedGroup !== 1) {
            throw new StatusError(404, "Group is not found.");
        }

        return removedGroup;
    }

    async checkUserInGroup(groupId: number, userId: number): Promise<boolean> {
        this.validator.validateRequiredFields({ groupId, userId });

        const userInGroup = await this.groupRepository.checkUserGroupEntity(groupId, userId);
        return !!userInGroup;
    }

    async addUserToGroup(groupId: number, ownerId: number, userId: number): Promise<boolean> {
        this.validator.validateRequiredFields({ groupId, ownerId, userId });

        const group = await this.getGroup(groupId);
        if (group.owner_id !== ownerId) {
            throw new StatusError(403, "Not allowed.");
        }

        const userAlreadyInGroup = await this.checkUserInGroup(groupId, userId);
        if (userAlreadyInGroup) {
            throw new StatusError(400, "User already in group.");
        }

        await this.groupRepository.createUserGroupEntity(groupId, userId);
        return true;
    }

    async deleteUserFromGroup(groupId: number, ownerId: number, userId: number): Promise<number> {
        this.validator.validateRequiredFields({ groupId, ownerId, userId });

        const group = await this.getGroup(groupId);
        if (group.owner_id !== ownerId) {
            throw new StatusError(403, "Not allowed.");
        }

        const userInGroup = await this.checkUserInGroup(groupId, userId);
        if (!userInGroup) {
            throw new StatusError(400, "User is not in the group.");
        }

        return await this.groupRepository.removeUserGroupEntity(groupId, userId);
    }

   
}

export default GroupServices;
