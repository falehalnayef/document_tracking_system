
interface IUserAttributes {
  user_id: Number;
  user_name: String;
  email: String;
  password: String;
}

interface IUser extends IUserAttributes{
    display(): Object;
}


interface IUserRepository {
  create(user_name: String, email: String, password: String): Promise<IUser>;
}

interface IUserService {
  register(user_name: String, email: String, password: String): Promise<IUser>;
}

export {IUserAttributes, IUser, IUserRepository, IUserService };
