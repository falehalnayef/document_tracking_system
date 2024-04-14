import { Op } from "sequelize";
import { IGroup, IGroupRepository } from "../../interfaces/business_interfaces/group.interfaces";


import db from "../database/db";

const Group = db.GroupModel;
const UserGroupModel = db.UserGroupModel;


class GroupRepository implements IGroupRepository{
   

   async getGroupsByAttribute(attributes: {[key: string]: any}): Promise<object[]> {

    const whereClause: { [key: string]: any } = {};

    for (const key in attributes) {
        if (Array.isArray(attributes[key])) {
            whereClause[key] = { [Op.in]: attributes[key] };
        } else {
            whereClause[key] = attributes[key];
        }
    }

    const groups = await Group.findAll({ where: whereClause });
    return groups;

}


   async create(group_name: string, owner_id: number, is_public: boolean): Promise<IGroup> {


    const group = await Group.create({group_name, owner_id, is_public});

        return group;
    }


   async getGroup(group_id: number): Promise<IGroup> {

    const group = await Group.findByPk(group_id);

    return group;

}



    async remove(group_id: number): Promise<number> {

        const group = await Group.destroy({where:{group_id}});

        return group;
    }

   async checkUserGroupEntity(group_id: number, user_id: number): Promise<Object> {

        const userGroup = await UserGroupModel.findOne({where:{group_id, user_id}});

        return userGroup;

    }

    async createUserGroupEntity(group_id: number, user_id: number): Promise<Object> {


        const userGroup = await UserGroupModel.create({group_id, user_id});

        return userGroup;

    }
    
   async removeUserGroupEntity(group_id: number, user_id: number): Promise<number> {

        const userGroup = await UserGroupModel.destroy({where:{group_id, user_id}});

        return userGroup;
    }

   async getUserGroupEntity(user_id: number, attributes: string[] = []): Promise<object[]> {
        const userGroups = await UserGroupModel.findAll({where:{user_id}, attributes});

        return userGroups;  
      }



}

export default GroupRepository;