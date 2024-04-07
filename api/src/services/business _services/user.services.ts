import { IUser, IUserService } from "../../interfaces/business_interfaces/user.interfaces";
import UserRepository from "../../data/repositories/user.repository";
import User from "../../dto/user";
import HashServices from "../utility_services/hash.services";
import Validator from "../../validation/validators";
import StatusError from "../../utils/error";
import JWTServices from "../utility_services/jwt.service";

class UserServices implements IUserService {
    private userRepository: UserRepository;
    private validator: Validator;
    private hashServices: HashServices;
    private jwtServices: JWTServices;

    constructor() {
        this.validator = new Validator();
        this.userRepository = new UserRepository();
        this.hashServices = new HashServices();
        this.jwtServices = new JWTServices();
    }

    async login(email: string, password: string): Promise<IUser> {
        if (!email || !password) {
            throw new StatusError(400, "Please provide both email and password.");
        }

        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new StatusError(400, "Invalid email or password.");
        }

        const check = await this.hashServices.compare(password, user.password as string);
        if (!check) {
            throw new StatusError(400, "Invalid email or password.");
        }

        const accessToken = await this.jwtServices.generateToken({ user_id: user.user_id, user_name: user.user_name }, { expiresIn: "1d" });
        user.accessToken = accessToken;

        return new User(user);
    }

    async register(user_name: string, email: string, password: string): Promise<IUser> {
        this.validator.registerValidator(user_name, email, password);

        const hashedPassword = await this.hashServices.hash(password, 10);
        const user = await this.userRepository.create(user_name, email, hashedPassword);

        return new User(user);
    }

    async getUser(user_id: number, attributes: string[] = []): Promise<IUser> {
        if (!user_id) {
            throw new StatusError(400, "Please provide a user ID.");
        }

        const user = await this.userRepository.findUserByPK(user_id, attributes);


        if (!user) {
            throw new StatusError(404, "User not found.");

        }
        return new User(user);
    }
}

export default UserServices;
