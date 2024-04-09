interface IValidator {
    isValidUserName(user_name: string): boolean;
    isValidEmail(email: string): boolean;
    isValidPassword(password: string): boolean;
    registerValidator(user_name: string, email:string, password:string): void;
    validateRequiredFields(fields: Record<string, any>): void;
}

export default IValidator;