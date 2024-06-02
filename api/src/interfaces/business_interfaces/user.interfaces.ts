interface IUserAttributes {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
}

interface IUser extends IUserAttributes {
  display(): object;
  accessToken: string;
}

interface IUserRepository {
  create(user_name: string, email: string, password: string): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser>;
  findUserByPK(user_id: number, attributes: string[]): Promise<IUser>;
  getUsersByAttribute(
    attribute: { [key: string]: any },
    select: ConcatArray<string>
  ): Promise<object[]>;
}

interface IUserService {
  userRepository: IUserRepository;
  register(userName: string, email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
  getUser(userId: number, attributes?: string[]): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
  showUser(userId: number): Promise<IUser>;
}

export { IUserAttributes, IUser, IUserRepository, IUserService };
