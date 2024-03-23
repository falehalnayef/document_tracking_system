import { Router, Request, Response, NextFunction } from "express";
import UserController from "../controllers/user.controller";

class UserRouter {
    public router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/createUser", this.createUser);

    }

    private createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.userController.createUser(req, res);

        } catch (error) {
            next(error);
        }
    };
}

export default new UserRouter().router;
