import { IGroup, IGroupRepository } from "../../interfaces/business_interfaces/group.interfaces";


import db from "../database/db";

const Group = db.GroupModel;

class GroupRepository implements IGroupRepository{



   async getGroupsByOwnerID(owner_id: Number): Promise<IGroup> {

    const groups = await Group.findAll({where:{owner_id}});


    return groups;
   }



   async create(group_name: String, owner_id: Number, is_public: Boolean): Promise<IGroup> {


    const group = await Group.create({group_name, owner_id, is_public});

        return group;
    }
    async remove(group_id: string): Promise<string> {

        const group = await Group.destroy({where:{group_id}});

        return group;
    }
  

}

export default GroupRepository;