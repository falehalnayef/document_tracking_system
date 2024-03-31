import { IGroup, IGroupRepository } from "../../interfaces/business_interfaces/group.interfaces";


import db from "../database/db";

const Group = db.GroupModel;

class GroupRepository implements IGroupRepository{



   async create(group_name: String, owner_id: Number, is_public: Boolean): Promise<IGroup> {


    const group = await Group.create({group_name, owner_id, is_public});

        return group;
    }

}

export default GroupRepository;