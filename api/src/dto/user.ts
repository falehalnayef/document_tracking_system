import { IUser } from "../interfaces/business_interfaces/user.interfaces";

class User implements IUser {
    user_id: Number;
    user_name: String;
    email: String;
    password: String;
    accessToken: String;


    constructor(user: IUser) {
        this.user_id =  user.user_id;
        this.user_name = user.user_name;
        this.email = user.email;
        this.password = user.password;
        this.accessToken = user.accessToken;
    }

    display(): Object {
        return {
            user_id: this.user_id,
            user_name: this.user_name,
            email: this.email,
            accessToken: this.accessToken
        };
    }
}

export default User;