import { IGroup } from "../interfaces/business_interfaces/group.interfaces";

class Group implements IGroup {
    group_id: Number;
    group_name: String;
    owner_id: Number;
    is_public: Boolean;


    constructor(group: IGroup) {
        this.group_id =  group.group_id;
        this.group_name = group.group_name;
        this.owner_id = group.owner_id;
        this.is_public = group.is_public;
    }
   

    display(): Object {
        return {
            Group_id: this.group_id,
            Group_name: this.group_name,
            owner_id: this.owner_id,
            is_public: this.is_public
        };
    }
}

export default Group;