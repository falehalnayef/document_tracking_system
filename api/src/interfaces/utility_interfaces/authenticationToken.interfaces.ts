interface IPayload{
    user_id:number;
    user_name:string;
}

interface IAuthenticationTokenService{
    generateToken(payload: IPayload, options?: object): Promise<string>;
    verifyToken(token: string):Promise<IPayload>;
}


export {IPayload};
export default IAuthenticationTokenService;