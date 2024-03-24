
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../config/config';
import JwtPayload from '../../interfaces/utility_interfaces/jwt.interfaces';



class JWTServices{


    private readonly secretKey: Secret;

    constructor(){
        this.secretKey = config.JWT_SECRET_KEY!;
    }

    async generateToken(payload: Object, options?: SignOptions): Promise<String>{


        return jwt.sign(payload, this.secretKey, options);

    }

    
    async verifyToken(token: string):Promise<JwtPayload>  {


         return jwt.verify(token, this.secretKey) as JwtPayload;

    }


}

export default JWTServices;