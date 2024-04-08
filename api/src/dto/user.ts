import { IUser } from "../interfaces/business_interfaces/user.interfaces";

class User implements IUser {
    user_id: number;
    user_name: string;
    email: string;
    password: string;
    accessToken: string;


    constructor(user: IUser) {
        this.user_id =  user.user_id;
        this.user_name = user.user_name;
        this.email = user.email;
        this.password = user.password;
        this.accessToken = user.accessToken;
    }

    display(): Object {
        const { password, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }
}

export default User;