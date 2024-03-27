import { IUser, IUserService} from "../../interfaces/business_interfaces/user.interfaces";

import UserRepository from "../../data/repositories/user.repository";
import User from "../../dto/user";

import HashServices from "../utility_services/hash.services";
import StatusError from "../../utils/error";

class UserServices implements IUserService{

   private userRepository: UserRepository;
   private hashServices: HashServices;

    

   constructor(){
    this.userRepository = new UserRepository();
    this.hashServices = new HashServices();
   }

   async register(user_name: string, email: string, password: string): Promise<IUser> {
    if (!user_name || !email || !password) {
        
        throw new StatusError(404, "Bad Request");
    }

    const hashedPassword = await this.hashServices.hash(password, 10);

    const user = await this.userRepository.create(user_name, email, hashedPassword);
    

    return new User(user);
    }

    
}


export default UserServices;