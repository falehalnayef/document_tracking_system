import { IUser, IUserRepository } from "../../interfaces/business_interfaces/user.interfaces";

import db from "../database/db";

const User = db.UserModel;

class UserRepository implements IUserRepository{


    async create(user_name: String, email: String, password: String): Promise<IUser> {


      
        const user = await User.create({user_name, email, password});

        return user;
        
    }
}

export default UserRepository;