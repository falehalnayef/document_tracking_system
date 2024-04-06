
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../config/config';
import JwtPayload from '../../interfaces/utility_interfaces/jwt.interfaces';
import StatusError from '../../utils/error';



class JWTServices{


    private readonly secretKey: Secret;

    constructor(){
        this.secretKey = config.JWT_SECRET_KEY!;
    }

    async generateToken(payload: JwtPayload, options?: SignOptions): Promise<string>{


        if (!this.secretKey || !payload) {
        
            throw new StatusError(404, "Bad Request")
        }
        return jwt.sign(payload, this.secretKey, options);

    }

    
    async verifyToken(token: string):Promise<JwtPayload>  {

        if (!this.secretKey || !token) {
        
            throw new StatusError(404, "Bad Request")
        }

         return jwt.verify(token, this.secretKey) as JwtPayload;

    }


}

export default JWTServices;