interface IGroupAttributes{
    group_id: Number;
    group_name: String;
    owner_id: Number;
    is_public: Boolean;
    }


interface IGroup extends IGroupAttributes{

        
    }

    
    
    interface IGroupRepository {
      create(group_name: String, owner_id: Number, is_public: Boolean): Promise<IGroup>;
    
    }
    
    interface IGroupService {
        createGroup(group_name: String, owner_id: Number, is_public: Boolean): Promise<IGroup>;
    
    }





export {IGroupAttributes, IGroup, IGroupRepository, IGroupService}
