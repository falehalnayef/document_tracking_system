import { IUser, IUserRepository, IUserService } from "../../interfaces/business_interfaces/user.interfaces.js";
import User from "../../dto/user.js";
import StatusError from "../../utils/error.js";
import IValidator from "../../interfaces/utility_interfaces/validator.interface.js";
import IHashService from "../../interfaces/utility_interfaces/hashService.interface.js";
import IAuthenticationTokenService from "../../interfaces/utility_interfaces/authenticationToken.interfaces.js";

class UserServices implements IUserService {
    public userRepository: IUserRepository;
    private validator: IValidator;
    private hashServices: IHashService;
    private authTokenServices: IAuthenticationTokenService;

    constructor(userRepository: IUserRepository, validator: IValidator, hashServices: IHashService, authTokenServices: IAuthenticationTokenService) {
        this.userRepository = userRepository;
        this.validator = validator;
        this.hashServices = hashServices;
        this.authTokenServices = authTokenServices;
    }

    async login(email: string, password: string): Promise<IUser> {


        this.validator.validateRequiredFields({email, password})

        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new StatusError(400, "Invalid email or password.");
        }

        const check = await this.hashServices.compare(password, user.password as string);
        if (!check) {
            throw new StatusError(400, "Invalid email or password.");
        }

        const accessToken = await this.authTokenServices.generateToken({ userId: user.user_id, userName: user.user_name }, { expiresIn: "1d" });
        user.accessToken = accessToken;

        return new User(user);
    }

    async register(userName: string, email: string, password: string): Promise<IUser> {
        this.validator.registerValidator(userName, email, password);

        const hashedPassword = await this.hashServices.hash(password, 10);
        const user = await this.userRepository.create(userName, email, hashedPassword);

        return new User(user);
    }

    async getUser(userId: number, attributes: string[] = []): Promise<IUser> {
        if (!userId) {
            throw new StatusError(400, "Please provide a user ID.");
        }

        const user = await this.userRepository.findUserByPK(userId, attributes);


        if (!user) {
            throw new StatusError(404, "User not found.");

        }
        return new User(user);
    }

   async getAllUsers(): Promise<IUser[]>{

    const users = await this.userRepository.getUsersByAttribute({}, ["user_name"]);
    const usersArray: User[] = [];

    for (const user of users) {
        usersArray.push(new User(user as IUser));
    }
    
    return usersArray;
    
   }


   async showUser(userId: number): Promise<IUser>{

    const user = await this.getUser(userId, ["user_name", "email"]);
    
    return user;

   }

}



export default UserServices;
