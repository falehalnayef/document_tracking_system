import IValidator from "../interfaces/utility_interfaces/validator.interface.js";
import StatusError from "../utils/error.js";

class Validator implements IValidator {
  public isValidUserName(user_name: string): boolean {
    if (!user_name) {
      throw new StatusError(400, "Enter User Name.");
    }
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(user_name);
  }

  public isValidEmail(email: string): boolean {
    if (!email) {
      throw new StatusError(400, "Enter Email.");
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public isValidPassword(password: string): boolean {
    if (!password) {
      throw new StatusError(400, "Enter Password.");
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  }

  public registerValidator(
    user_name: string,
    email: string,
    password: string
  ): void {
    if (!this.isValidUserName(user_name)) {
      throw new StatusError(400, "Invalid User Name Format.");
    }

    if (!this.isValidEmail(email)) {
      throw new StatusError(400, "Invalid Email Format.");
    }

    if (!this.isValidPassword(password)) {
      throw new StatusError(400, "Invalid Password Format.");
    }
  }

  public validateRequiredFields(fields: Record<string, any>): void {
    for (const key in fields) {
      if (!fields[key]) {
        throw new StatusError(400, `${key.toUpperCase()} is required.`);
      }
    }
  }
}

export default Validator;
