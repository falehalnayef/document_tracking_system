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
    display(): object;

        
    }

    
    
    interface IGroupRepository {
      create(group_name: string, owner_id: number, is_public: boolean): Promise<IGroup>;
      getGroupsByAttribute(attribute:{[key: string]: any}): Promise<object[]>;
      getGroup(group_id: number): Promise<IGroup>;    
      remove(group_id: number): Promise<number>;
      checkUserGroupEntity(group_id: number, user_id: number): Promise<object>
      createUserGroupEntity(group_id: number, user_id: number): Promise<object>
      removeUserGroupEntity(group_id: number, user_id: number): Promise<number>   
      getUserGroupEntity(user_id: number, attributes: string[]): Promise<object>
     

    
    }
    
    interface IGroupService {
        createGroup(groupName: string, ownerId: number, isPublic: boolean): Promise<IGroup>;
        index(ownerId: number): Promise<IGroup[]>;
        indexAsAmember(userId: number): Promise<IGroup[]>;
        getGroup(groupId: number): Promise<IGroup>;    
        deleteGroup(groupId: number, userId: number): Promise<number>;    
        checkUserInGroup(groupId: number, userId: number): Promise<boolean>
        addUserToGroup(groupId: number, userId: number, ownerId?: number): Promise<boolean>
        deleteUserFromGroup(groupId: number, userId: number, ownerId?: number): Promise<number>



    }





export {IGroupAttributes, IGroup, IGroupRepository, IGroupService, IUserGroupAttributes, IFileGroupAttributes}
