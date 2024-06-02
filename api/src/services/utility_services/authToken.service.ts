import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config/config.js";
import IAuthenticationTokenService, {
  IPayload,
} from "../../interfaces/utility_interfaces/authenticationToken.interfaces.js";
import StatusError from "../../utils/error.js";

class JWTServices implements IAuthenticationTokenService {
  private readonly secretKey: Secret;

  constructor() {
    this.secretKey = config.JWT_SECRET_KEY!;
  }

  async generateToken(
    payload: IPayload,
    options?: SignOptions
  ): Promise<string> {
    if (!this.secretKey || !payload) {
      throw new StatusError(404, "Bad Request");
    }
    return jwt.sign(payload, this.secretKey, options);
  }

  async verifyToken(token: string): Promise<IPayload> {
    if (!this.secretKey || !token) {
      throw new StatusError(404, "Bad Request");
    }

    return jwt.verify(token, this.secretKey) as IPayload;
  }
}

export default JWTServices;
