import { IGroup } from "../interfaces/business_interfaces/group.interfaces";

class Group implements IGroup {
    group_id!: Number;
    group_name!: String;
    owner_id!: Number;
    is_public!: Boolean;
    private data!: Object[];


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
                 this.initializeData(groups);
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