interface IGroupAttributes{
    group_id: Number;
    group_name: String;
    owner_id: Number;
    is_public: Boolean;
    }


interface IGroup extends IGroupAttributes{
    display(): any;

        
    }

    
    
    interface IGroupRepository {
      create(group_name: String, owner_id: Number, is_public: Boolean): Promise<IGroup>;
      getGroupsByOwnerID(owner_id: Number): Promise<IGroup>;
      remove(group_id: string): Promise<string>;

    
    }
    
    interface IGroupService {
        createGroup(group_name: String, owner_id: Number, is_public: Boolean): Promise<IGroup>;
        index(owner_id: Number): Promise<IGroup>;
        deleteGroup(group_id: string): Promise<string>;    
    }





export {IGroupAttributes, IGroup, IGroupRepository, IGroupService}
