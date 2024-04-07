import { Router, Request, Response, NextFunction } from "express";
import GroupController from "../controllers/gruop.controller";


class GroupRouter {


    public router: Router;
    private groupController: GroupController;


    constructor(){

        this.router = Router();
        this.groupController = new GroupController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/createGroup", this.createGroup);
        this.router.get("/index", this.getMyGroups);
        this.router.delete("/deleteGroup/:group_id", this.deleteGroup);
        this.router.get("/getGroup/:group_id", this.getGroup);
        this.router.post("/addUser", this.addUserToGroup);
        this.router.post("/joinGroup", this.joinGroup);
        this.router.delete("/:group_id/removeUser/:user_id", this.deleteUserFromGroup);
        this.router.delete("/:group_id/leaveGroupByUser/:user_id", this.leaveGroup);

    }
    private createGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.createGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private getMyGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.getMyGroups(req, res);

        } catch (error) {
            next(error);
        }
    };

    private deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.deleteGroup(req, res);

        } catch (error) {
            next(error);
        }
    };


    private getGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.getGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private addUserToGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.addUserToGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private joinGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.joinGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private deleteUserFromGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.deleteUserFromGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private leaveGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.leaveGroup(req, res);

        } catch (error) {
            next(error);
        }
    };
}


export default new GroupRouter().router;
