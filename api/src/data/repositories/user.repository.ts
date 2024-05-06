import { Op } from "sequelize";
import { IUser, IUserRepository } from "../../interfaces/business_interfaces/user.interfaces.js";

import db from "../database/db.js";

const User = db.UserModel;

class UserRepository implements IUserRepository{


    async getUsersByAttribute(attributes: {[key: string]: any}, select: ConcatArray<string>): Promise<object[]> {

    
    const whereClause: { [key: string]: any } = {};

    for (const key in attributes) {
        if (Array.isArray(attributes[key])) {
            whereClause[key] = { [Op.in]: attributes[key] };
        } else {
            whereClause[key] = attributes[key];
        }
    }

    const users = await User.findAll({ where: whereClause, attributes:["user_id"].concat(select)});
    return users;
    
    }
    async findUserByPK(user_id: Number, attributes: ConcatArray<string>): Promise<IUser> {

        const user = await User.findByPk(user_id, {attributes:["user_id"].concat(attributes)});

        return user;
        
    }

    async findUserByEmail(email: String): Promise<IUser> {

        const user = await User.findOne({where:{email}});

        return user;
        
    }


    async create(user_name: String, email: String, password: String): Promise<IUser> {


        const user = await User.create({user_name, email, password});

        return user;
        
    }
}

export default UserRepository;