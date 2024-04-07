import { IGroup } from "../interfaces/business_interfaces/group.interfaces";

class Group implements IGroup {
    group_id!: number;
    group_name!: string;
    owner_id!: number;
    is_public!: boolean;
    private data!: object[];


     constructor(groups: IGroup) {
      
        this.data = new Array<IGroup>;
         this.init(groups);
         
            
        };

         init(groups: IGroup){

            if (Array.isArray(groups)) {
                for (const group of groups) {
                     this.initializeData(group);
                }

            } else{
                 this.group_id = groups.group_id;
                 this.group_name = groups.group_name;
                 this.owner_id = groups.owner_id;
                 this.is_public = groups.is_public;
            }
               
        }


    async initializeData(group: IGroup) {

         this.data.push( {
             "group_id": group.group_id,
             "group_name": group.group_name,
             "owner_id": group.owner_id,
             "is_public": group.is_public,
         });

    }
   

   public display(): any {
        if (this.data.length === 1) {
            return this.data[0]
        }
        return this.data;
    }
}

export default Group;