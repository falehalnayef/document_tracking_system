import { Router, Response, NextFunction } from "express";
import UserController from "../controllers/user.controller";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface";

class UserRouter {
    public router: Router;
    private userController: UserController;

    constructor(router: Router, userController: UserController) {
        this.router = router;
        this.userController = userController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/registration", this.createUser);
        this.router.post("/login", this.login);


    }

    private createUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.userController.createUser(req, res);

        } catch (error) {
            next(error);
        }
    };

    private login = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.userController.login(req, res);

        } catch (error) {
            next(error);
        }
    };
}

export default UserRouter;
