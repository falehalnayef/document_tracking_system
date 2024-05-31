import { Router } from "express";
import UserRouter from "./user.routers.js";
import GroupRouter from "./group.routers.js";
import UserAuth from "../middlewares/auth_middleware/user.auth.js";
import UserController from "../controllers/user.controller.js";
import UserServices from "../services/business _services/user.services.js";
import UserRepository from "../data/repositories/user.repository.js";
import Validator from "../validation/validators.js";
import HashServices from "../services/utility_services/hash.services.js";
import JWTServices from "../services/utility_services/authToken.service.js";
import GroupController from "../controllers/gruop.controller.js";
import GroupServices from "../services/business _services/group.services.js";
import GroupRepository from "../data/repositories/group.repository.js";
import FileRouter from "./file.routers.js";
import FileController from "../controllers/file.controller.js";
import FileServices from "../services/business _services/file.services.js";
import FileRepository from "../data/repositories/file.repository.js";
import errorHandler from "../middlewares/handlers/error.handler.handler.js"
import BookingRepository from "../data/repositories/booking.repository.js";
import ArchiveRepository from "../data/repositories/archive.repository.js";


class IndexRouter {
    router: Router;
    userRouter: Router;
    groupRouter: Router;
    fileRouter: Router;

    auth: UserAuth;
    constructor() {
        this.router = Router();

        const validator = new Validator();
        const authTokenServices = new JWTServices();
        const bookingRepository = new BookingRepository();
        const archiveRepository = new ArchiveRepository();
        const userServices = new UserServices(new UserRepository(), validator, new HashServices(), authTokenServices);
        const fileSer = new FileServices(new FileRepository(), bookingRepository, archiveRepository, validator, null);
        const groupServices = new GroupServices(new GroupRepository(), userServices, fileSer,  validator);
        const fileServices = new FileServices(new FileRepository(), bookingRepository, archiveRepository,validator, groupServices);

        this.auth = new UserAuth(userServices, authTokenServices);


        this.userRouter = new UserRouter(new UserController(userServices), this.auth).router;
        this.groupRouter = new GroupRouter(new GroupController(groupServices)).router;
        this.fileRouter = new FileRouter(new FileController(fileServices)).router;
        


        

        
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use("/groups", this.auth.checkUser.bind(this.auth), this.groupRouter.bind(this.groupRouter));
        this.router.use("/users", this.userRouter.bind(this.userRouter));
        this.router.use("/files", this.auth.checkUser.bind(this.auth), this.fileRouter.bind(this.fileRouter));
    }
}


export default new IndexRouter().router;
