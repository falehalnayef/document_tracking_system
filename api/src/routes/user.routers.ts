import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserAuth from "../middlewares/auth_middleware/user.auth.js";

class UserRouter {
    public router: Router;
    private userController: UserController;
    auth: UserAuth;

    constructor(userController: UserController, auth: UserAuth) {
        this.router = Router();
        this.userController = userController;
        this.auth = auth;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.auth.checkUser, this.userController.getAllUsers.bind(this.userController));
        this.router.post("/", this.userController.createUser.bind(this.userController));
        this.router.post("/login", this.userController.login.bind(this.userController));
        this.router.get("/:userId", this.auth.checkUser, this.userController.showUser.bind(this.userController));

    }
}

export default UserRouter;
