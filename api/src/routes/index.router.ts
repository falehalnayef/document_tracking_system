import { Router } from "express";
import UserRouter from "./user.routers";
import GroupRouter from "./group.routers";
import UserAuth from "../middlewares/authMiddleware/user.auth";
import UserController from "../controllers/user.controller";
import UserServices from "../services/business _services/user.services";
import UserRepository from "../data/repositories/user.repository";
import Validator from "../validation/validators";
import HashServices from "../services/utility_services/hash.services";
import JWTServices from "../services/utility_services/authToken.service";
import GroupController from "../controllers/gruop.controller";
import GroupServices from "../services/business _services/group.services";
import GroupRepository from "../data/repositories/group.repository";


class IndexRouter {
    public router: Router;
    private userRouter: Router;
    private groupRouter: Router;
    private auth: UserAuth;

    constructor() {
        this.router = Router();

        const validator = new Validator();
        const authTokenServices = new JWTServices();
        const userServices = new UserServices(new UserRepository(), validator, new HashServices(), authTokenServices);
        const groupServices = new GroupServices(new GroupRepository(), userServices, validator);
        this.userRouter = new UserRouter(this.router, new UserController(userServices)).router;
        this.groupRouter = new GroupRouter(this.router, new GroupController(groupServices)).router;
        this.auth = new UserAuth(userServices, authTokenServices);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use("/users", this.userRouter);
        this.router.use("/groups", this.auth.checkUser, this.groupRouter);
    }

}

export default new IndexRouter().router;
