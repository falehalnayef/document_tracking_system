import { NextFunction, Response } from "express";
import AuthenticatedRequest from "../../interfaces/utility_interfaces/request.interface";
import StatusError from "../../utils/error";
import { failedResponse } from "../../utils/responseMessage";
import IAuthenticationTokenService from "../../interfaces/utility_interfaces/authenticationToken.interfaces";
import { IUserService } from "../../interfaces/business_interfaces/user.interfaces";

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
        const user = await this.userServices.getUser(payload.user_id, ["user_name"]);
        if (!user) throw new StatusError(404, "User Not Found.");
        return user;
    }

    async checkUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization!;
            const user = await this.getUser(token);
            req.user_id = user.user_id;
            req.user_name = user.user_name;
            next();
        } catch (error: any) {
            let statusCode = error.statusCode || 500;
            res.status(statusCode).json(failedResponse(error.message));
        }
    }
}

export default UserAuth;
