
interface IUserAttributes {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
}

interface IUser extends IUserAttributes{
    display(): object;
    accessToken:string;
}


interface IUserRepository {
  create(user_name: string, email: string, password: string): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser>;
  findUserByPK(user_id: number, attributes: string[]): Promise<IUser>

}

interface IUserService {
  register(user_name: string, email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
  getUser(user_id: number, attributes?: string[]): Promise<IUser>



}

export {IUserAttributes, IUser, IUserRepository, IUserService };
