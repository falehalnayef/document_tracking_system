import { IUser, IUserRepository } from "../../interfaces/user.interfaces";

import db from "../database/db";

const User = db.UserModel;

class UserRepository implements IUserRepository{


    async create(user_name: String, email: String, password: String): Promise<IUser> {


        if (!user_name || !email || !password) {
        
            throw new Error();
        }
        const user = await User.create({user_name, email, password});

        return user;
        
    }
}

export default UserRepository;