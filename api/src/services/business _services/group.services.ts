import Group from "../../dto/group.js";
import { IGroup, IGroupRepository, IGroupService } from "../../interfaces/business_interfaces/group.interfaces.js";
import { IUserService } from "../../interfaces/business_interfaces/user.interfaces.js";
import IValidator from "../../interfaces/utility_interfaces/validator.interface.js";
import StatusError from "../../utils/error.js";

class GroupServices implements IGroupService {
    private groupRepository: IGroupRepository;
    private validator: IValidator;
    private userServices: IUserService;

    constructor(groupRepository: IGroupRepository, userServices: IUserService, validator: IValidator) {
        this.groupRepository = groupRepository;
        this.userServices = userServices;
        this.validator = validator;


    }

    async createGroup(groupName: string, ownerId: number, isPublic: boolean): Promise<IGroup> {
        this.validator.validateRequiredFields({ groupName, ownerId });

        const group = await this.groupRepository.create(groupName, ownerId, isPublic);
        
        return new Group(group);
    }

    async indexAsPublic(): Promise<IGroup[]> {

        const groupData = await this.groupRepository.getGroupsByAttribute({is_public:true});

        const groups: Group[] = [];
        for (const group of groupData) {
          groups.push(new Group(group as IGroup));
        }

        return groups;   
    }
    async index(owner_id: number): Promise<IGroup[]> {
        this.validator.validateRequiredFields({ owner_id });

        const groupData = await this.groupRepository.getGroupsByAttribute({owner_id});

        const groups: Group[] = [];
        for (const group of groupData) {
          groups.push(new Group(group as IGroup));
        }

        return groups;   
    }

    async indexAsAmember(user_id: number): Promise<IGroup[]> {
        this.validator.validateRequiredFields({ user_id });

        const groupIDsData: Group[] = await this.groupRepository.getUserGroupEntity(user_id, ["group_id"]) as Group[];

        const group_id: number[] = groupIDsData.map(v => v.group_id);

        const groupData = await this.groupRepository.getGroupsByAttribute({group_id});

        const groups: Group[] = [];
        for (const group of groupData) {
          groups.push(new Group(group as IGroup));
        }

        return groups;   
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

        const userInGroup = await this.groupRepository.checkUserGroupEntity(groupId, userId);
        return !!userInGroup;
    }

    async addUserToGroup(groupId: number, userId: number, ownerId?: number): Promise<boolean> {
        this.validator.validateRequiredFields({ groupId, userId });
    
        const group = await this.getGroup(groupId);
    
        if (ownerId && group.owner_id !== ownerId) {
            throw new StatusError(403, "Not allowed.");
        }
    
        if (ownerId && userId === ownerId) {
            throw new StatusError(400, "Are you kidding?.");
        }
        if (!ownerId && !group.is_public) {
            throw new StatusError(400, "The group is private.");
        }
        
        const userAlreadyInGroup = await this.checkUserInGroup(groupId, userId);
        if (userAlreadyInGroup) {
            throw new StatusError(400, "User already in group.");
        }
    
        await this.groupRepository.createUserGroupEntity(groupId, userId);
    
        return true;
    }
    

    async deleteUserFromGroup(groupId: number, userId: number, ownerId?: number): Promise<number> {
        this.validator.validateRequiredFields({ groupId, userId });

        const group = await this.getGroup(groupId);
        await this.userServices.getUser(userId);

        if (ownerId && group.owner_id !== ownerId) {
            throw new StatusError(403, "Not allowed.");
        }
    
        if (ownerId && userId === ownerId) {
            throw new StatusError(400, "Are you kidding?.");
        }

        const userInGroup = await this.checkUserInGroup(groupId, userId);
        if (!userInGroup) {
            throw new StatusError(400, "User is not in the group.");
        }

        return await this.groupRepository.removeUserGroupEntity(groupId, userId);
    }

   
}




export default GroupServices;
