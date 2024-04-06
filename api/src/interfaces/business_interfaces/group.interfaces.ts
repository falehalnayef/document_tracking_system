interface IGroupAttributes{
    group_id: number;
    group_name: string;
    owner_id: number;
    is_public: boolean;
    }

    interface IUserGroupAttributes{
        ug_id: number;
        group_id: number;
        user_id: number;
       
      }

      interface IFileGroupAttributes{
        fg_id: number;
        group_id: number;
        file_id: number;
       
      }

interface IGroup extends IGroupAttributes{
    display(): any;

        
    }

    
    
    interface IGroupRepository {
      create(group_name: string, owner_id: number, is_public: boolean): Promise<IGroup>;
      getGroupsByOwnerID(owner_id: number): Promise<IGroup>;
      getGroup(group_id: number): Promise<IGroup>;    
      remove(group_id: number): Promise<number>;
      checkUserGroupEntity(group_id: number, user_id: number): Promise<object>
      createUserGroupEntity(group_id: number, user_id: number): Promise<object>
      removeUserGroupEntity(group_id: number, user_id: number): Promise<number>


    
    }
    
    interface IGroupService {
        createGroup(group_name: string, owner_id: number, is_public: boolean): Promise<IGroup>;
        index(owner_id: number): Promise<IGroup>;
        getGroup(group_id: number): Promise<IGroup>;    
        deleteGroup(group_id: number, user_id: number): Promise<number>;    
        checkUserInGroup(group_id: number, user_id: number): Promise<boolean>
        addUserToGroup(group_id: number, owner_id: number, user_id: number): Promise<boolean>
        deleteUserFromGroup(group_id: number, owner_id: number, user_id: number): Promise<number>



    }





export {IGroupAttributes, IGroup, IGroupRepository, IGroupService, IUserGroupAttributes, IFileGroupAttributes}
