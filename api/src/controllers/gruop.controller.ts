import { NextFunction, Response } from "express";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface.js";
import { successfulResponse } from "../utils/responseMessage.js";
import { IGroupService } from "../interfaces/business_interfaces/group.interfaces.js";

class GroupController {
  private groupServices: IGroupService;

  constructor(groupServices: IGroupService) {
    this.groupServices = groupServices;
  }

  async createGroup(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { groupName, isPublic } = req.body;

      const userId = req.userId!;
      const userName = req.userName!;

      const group = await this.groupServices.createGroup(
        groupName,
        userId,
        isPublic
      );

      res
        .status(201)
        .send(
          successfulResponse(
            `Group ${group.group_name} has been created By ${userName}`
          )
        );
    } catch (error: any) {
      next(error);
    }
  }

  async getMyGroupsAsOwner(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId!;

      const groups = await this.groupServices.index(userId);

      res.status(200).send(successfulResponse("Groups", groups));
    } catch (error: any) {
      next(error);
    }
  }

  async getMyGroupsAsMember(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId!;

      const groups = await this.groupServices.indexAsAmember(userId);

      res.status(200).send(successfulResponse("Groups", groups));
    } catch (error: any) {
      next(error);
    }
  }

  async getPublicGroups(
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groups = await this.groupServices.indexAsPublic();

      res.status(200).send(successfulResponse("Groups", groups));
    } catch (error: any) {
      next(error);
    }
  }

  async deleteGroup(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groupId = Number(req.params.groupId);

      const userId = req.userId!;

      await this.groupServices.deleteGroup(groupId, userId);

      res.status(200).send(successfulResponse("Group has been deleted."));
    } catch (error: any) {
      next(error);
    }
  }

  async searchForGroup(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groupName = req.params.groupName;

      const groups = await this.groupServices.searchForGroup(groupName);

      res.status(200).send(successfulResponse("Groups.", groups));
    } catch (error: any) {
      next(error);
    }
  }

  async addUserToGroup(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { groupId, userId } = req.body;

      const ownerId = req.userId!;

      await this.groupServices.addUserToGroup(groupId, userId, ownerId);

      res
        .status(200)
        .send(successfulResponse("User has been added to the group."));
    } catch (error: any) {
      next(error);
    }
  }

  async removeUserFromGroup(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groupId = Number(req.params.groupId);
      const userId = Number(req.params.userId);

      const ownerId = req.userId!;

      await this.groupServices.removeUserFromGroup(groupId, userId, ownerId);

      res
        .status(200)
        .send(successfulResponse("User has been deleted from the group."));
    } catch (error: any) {
      next(error);
    }
  }

  async joinGroup(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { groupId } = req.body;

      const userId = req.userId!;

      await this.groupServices.addUserToGroup(groupId, userId);

      res.status(200).send(successfulResponse("Joined the group."));
    } catch (error: any) {
      next(error);
    }
  }

  async leaveGroup(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groupId = Number(req.params.groupId);

      const userId = req.userId!;

      await this.groupServices.removeUserFromGroup(groupId, userId);

      res.status(200).send(successfulResponse("Left the group."));
    } catch (error: any) {
      next(error);
    }
  }
  async getGroup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const groupId = Number(req.params.groupId);

      const group = await this.groupServices.getGroup(groupId);

      res.status(200).send(successfulResponse("Group", group));
    } catch (error: any) {
      next(error);
    }
  }

  async getUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const groupId = Number(req.params.groupId);
      const userId = req.userId!;

      const users = await this.groupServices.getGroupUsers(groupId, userId);

      res.status(200).send(successfulResponse("Users", users));
    } catch (error: any) {
      next(error);
    }
  }
}

export default GroupController;
