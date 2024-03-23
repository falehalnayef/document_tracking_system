import { IUser, IUserService} from "../interfaces/user.interfaces";

import UserRepository from "../data/repositories/user.repository";
import User from "../dto/user";

class UserServices implements IUserService{

   private userRepository: UserRepository;
    

   constructor(){
    this.userRepository = new UserRepository();
   }
   async register(user_name: String, email: String, password: String): Promise<IUser> {


    const user = await this.userRepository.create(user_name, email, password);
    

    return new User(user);
    }


    
}

export default UserServices;