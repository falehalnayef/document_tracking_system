interface IValidator {
  isValidUserName(userName: string): boolean;
  isValidEmail(email: string): boolean;
  isValidPassword(password: string): boolean;
  registerValidator(userName: string, email: string, password: string): void;
  validateRequiredFields(fields: Record<string, any>): void;
}

export default IValidator;
