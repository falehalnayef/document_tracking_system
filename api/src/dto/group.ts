import { IGroup } from "../interfaces/business_interfaces/group.interfaces.js";

class Group implements IGroup {
  group_id!: number;
  group_name!: string;
  owner_id!: number;
  is_public!: boolean;

  constructor(group: IGroup) {
    this.group_id = group.group_id;
    this.group_name = group.group_name;
    this.owner_id = group.owner_id;
    this.is_public = group.is_public;
  }

  display(): object {
    return this;
  }
}

export default Group;
