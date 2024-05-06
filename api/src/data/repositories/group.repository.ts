import { Op } from "sequelize";
import { IGroup, IGroupRepository } from "../../interfaces/business_interfaces/group.interfaces.js";


import db from "../database/db.js";

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


 

async getGroupsByLike(likeAttribute: { [key: string]: any }, filters: { [key: string]: any }): Promise<object[]> {
    const whereClause: { [key: string]: any } = {};

    for (const key in likeAttribute) {
        whereClause[key] = { [Op.like]: `%${likeAttribute[key]}%` };
    }

    for (const key in filters) {
        whereClause[key] = filters[key];
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

        const userGroupEntity = await UserGroupModel.findOne({where:{group_id, user_id}});

        return userGroupEntity;

    }

    async createUserGroupEntity(group_id: number, user_id: number): Promise<Object> {


        const userGroupEntity = await UserGroupModel.create({group_id, user_id});

        return userGroupEntity;

    }
    
   async removeUserGroupEntity(group_id: number, user_id: number): Promise<number> {

        const userGroupEntity = await UserGroupModel.destroy({where:{group_id, user_id}});

        return userGroupEntity;
    }

   async getUserGroupEntity(user_id: number, attributes: string[] = []): Promise<object[]> {
        const userGroupEntity = await UserGroupModel.findAll({where:{user_id}, attributes});

        return userGroupEntity;  
      }

      async getGroupUserEntity(group_id: number, attributes: string[]): Promise<object>{
        const groupUserEntity = await UserGroupModel.findAll({where:{group_id}, attributes});

        return groupUserEntity;  
      }



}

export default GroupRepository;