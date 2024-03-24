import { IUser } from "../interfaces/business_interfaces/user.interfaces";

class User implements IUser {
    user_id: Number;
    user_name: String;
    email: String;
    password: String;

    constructor(data: IUser) {
        this.user_id =  data.user_id;
        this.user_name = data.user_name;
        this.email = data.email;
        this.password = data.password;
    }

    display(): Object {
        return {
            user_id: this.user_id,
            user_name: this.user_name,
            email: this.email,
        };
    }
}

export default User;