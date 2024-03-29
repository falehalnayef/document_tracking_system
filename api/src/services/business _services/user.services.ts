import { IUser, IUserService} from "../../interfaces/business_interfaces/user.interfaces";

import UserRepository from "../../data/repositories/user.repository";
import User from "../../dto/user";

import HashServices from "../utility_services/hash.services";
import Validator from "../../validation/validators";

class UserServices implements IUserService{

   private userRepository: UserRepository;
   private validator: Validator;

   private hashServices: HashServices;

    
constructor(){
    this.hashServices = new HashServices();
    this.userRepository = new UserRepository();
    this.validator = new Validator();
}

   async register(user_name: string, email: string, password: string): Promise<IUser> {


    this.validator.registerValidator(user_name, email, password);

    const hashedPassword = await this.hashServices.hash(password, 10);

    const user = await this.userRepository.create(user_name, email, hashedPassword);
    

    return new User(user);
    }

    
}


export default UserServices;