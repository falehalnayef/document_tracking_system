
interface IUserAttributes {
  user_id: Number;
  user_name: String;
  email: String;
  password: String;
}

interface IUser extends IUserAttributes{
    display(): Object;
    accessToken:String;
}


interface IUserRepository {
  create(user_name: String, email: String, password: String): Promise<IUser>;
  findUserByEmail(email: String): Promise<IUser>;

}

interface IUserService {
  register(user_name: String, email: String, password: String): Promise<IUser>;
  login(email: String, password: String): Promise<IUser>;

}

export {IUserAttributes, IUser, IUserRepository, IUserService };
