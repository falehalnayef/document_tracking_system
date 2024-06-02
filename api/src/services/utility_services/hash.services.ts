import bcrypt from "bcrypt";
import StatusError from "../../utils/error.js";
import IHashService from "../../interfaces/utility_interfaces/hashService.interface.js";

class HashServices implements IHashService {
  async hash(data: string, saltRounds: number): Promise<string> {
    if (!data || !saltRounds) {
      throw new StatusError(404, "Bad Request");
    }
    return await bcrypt.hash(data, saltRounds);
  }

  async compare(plainText: string, hashedValue: string): Promise<Boolean> {
    if (!plainText || !hashedValue) {
      throw new StatusError(404, "Bad Request");
    }
    return await bcrypt.compare(plainText, hashedValue);
  }
}

export default HashServices;
