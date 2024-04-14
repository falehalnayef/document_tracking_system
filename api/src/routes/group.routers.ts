import { Router, Response, NextFunction } from "express";
import GroupController from "../controllers/gruop.controller";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface";


class GroupRouter {


    public router: Router;
    private groupController: GroupController;


    constructor(router: Router, groupController: GroupController){

        this.router = router;
        this.groupController = groupController;
        this.initializeRoutes();
        this
    }

    private initializeRoutes(): void {
        this.router.post("/membership", this.joinGroup)
        this.router.post("/", this.createGroup);
        this.router.get("/ownership", this.getMyGroupsAsOwner);
        this.router.get("/membership", this.getMyGroupsAsMember);
        this.router.post("/users", this.addUserToGroup);
        this.router.delete("/:group_id", this.deleteGroup);
        this.router.get("/:group_id", this.getGroup);
        this.router.delete("/:group_id/users/:user_id", this.deleteUserFromGroup);
        this.router.delete("/:group_id/membership", this.leaveGroup);
    }
    private createGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
        
            await this.groupController.createGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private getMyGroupsAsOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.getMyGroupsAsOwner(req, res);

        } catch (error) {
            next(error);
        }
    };


    private getMyGroupsAsMember = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.getMyGroupsAsMember(req, res);

        } catch (error) {
            next(error);
        }
    };
    private deleteGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.deleteGroup(req, res);

        } catch (error) {
            next(error);
        }
    };
    private getGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.getGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private addUserToGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.addUserToGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private joinGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("join", req.user_id)

            await this.groupController.joinGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private deleteUserFromGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.deleteUserFromGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private leaveGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("leave", req.user_id)
            await this.groupController.leaveGroup(req, res);

        } catch (error) {
            next(error);
        }
    };
}


export default GroupRouter;
