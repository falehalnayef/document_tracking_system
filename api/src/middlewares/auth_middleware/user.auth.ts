import { NextFunction, Response } from "express";
import AuthenticatedRequest from "../../interfaces/utility_interfaces/request.interface.js";
import StatusError from "../../utils/error.js";
import IAuthenticationTokenService from "../../interfaces/utility_interfaces/authenticationToken.interfaces.js";
import { IUserService } from "../../interfaces/business_interfaces/user.interfaces.js";

class UserAuth {
    private userServices: IUserService;
    private authTokenServices: IAuthenticationTokenService;

    constructor(userServices: IUserService, authTokenServices: IAuthenticationTokenService) {
        this.userServices = userServices;
        this.authTokenServices = authTokenServices;

        // Bind the methods to the current instance
        this.getUser = this.getUser.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    async getUser(token: string) {
        if (!token) throw new StatusError(400, "No Token Provided.");
        const payload = await this.authTokenServices.verifyToken(token);
        const user = await this.userServices.getUser(payload.userId, ["user_name"]);
        if (!user) throw new StatusError(404, "User Not Found.");
        return user;
    }

    async checkUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            let token = req.headers.auth!;

            if(Array.isArray(token)) token = token[0];
            const user = await this.getUser(token);
            req.userId = user.user_id;
            req.userName = user.user_name;
            next();
        } catch (error: any) {
            next(error);       
        }
    }
}

export default UserAuth;
