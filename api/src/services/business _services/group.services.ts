import GroupRepository from "../../data/repositories/group.repository";
import Group from "../../dto/group";
import { IGroup, IGroupService } from "../../interfaces/business_interfaces/group.interfaces";
import StatusError from "../../utils/error";

class GruopServices implements IGroupService{

    private groupRepsoitory: GroupRepository;

    constructor(){
        this.groupRepsoitory = new GroupRepository();
    }
  


   


   async createGroup(group_name: String, owner_id: Number, is_public: Boolean): Promise<IGroup> {

        if (!group_name || !owner_id) throw new StatusError(400, "All Fields Are Required.");
        
         const group = await this.groupRepsoitory.create(group_name, owner_id, is_public);

         return new Group(group);

    }

   async index(owner_id: Number): Promise<IGroup> {

        if (!owner_id) throw new StatusError(400, "Owner ID Is Required.");
         

         const groups = await this.groupRepsoitory.getGroupsByOwnerID(owner_id);

         return new Group(groups);   
        
        }


        async deleteGroup(group_id: string): Promise<string> {

            if (!group_id) throw new StatusError(400, "Group ID Is Required.");
    
             const group = await this.groupRepsoitory.remove(group_id);

             if (group != "1") throw new StatusError(404, "Group Is Not Found.");
    
             return group;   
            
            }

            async addUserTOGroup(group_id: string): Promise<string> {

                if (!group_id) throw new StatusError(400, "Group ID Is Required.");
        
                 const group = await this.groupRepsoitory.remove(group_id);
    
                 if (group != "1") throw new StatusError(404, "Group Is Not Found.");
        
                 return group;   
                
                }
        

}

export default GruopServices;