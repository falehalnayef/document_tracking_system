interface IPayload {
  userId: number;
  userName: string;
}

interface IAuthenticationTokenService {
  generateToken(payload: IPayload, options?: object): Promise<string>;
  verifyToken(token: string): Promise<IPayload>;
}

export { IPayload };
export default IAuthenticationTokenService;
