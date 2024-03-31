import UserServices from "../../services/business _services/user.services";
import JWTServices from "../../services/utility_services/jwt.service";
import StatusError from "../../utils/error";

class UserAuth{

    private jwtServices: JWTServices;
    private userServices: UserServices;

    constructor(){
        this.jwtServices = new JWTServices();
        this.userServices = new UserServices();

    }

    async getUser(token: string){


        if (!token) throw new StatusError(400, "No Token Provided.");


       const payload = await this.jwtServices.verifyToken(token);


       const user = await this.userServices.getUser(payload.user_id, ["user_name"]);

       if(!user) throw new StatusError(400, "User Not Found.");

       return user;
    
    }
}

export default UserAuth;