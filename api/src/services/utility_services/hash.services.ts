import bcrypt from "bcrypt";
import StatusError from "../../utils/error";

class HashServices {

  async hash(data: string, saltRounds: number): Promise<String> {
    if (!data || !saltRounds) {
        
        throw new StatusError(404, "Bad Request")
    }
    return await bcrypt.hash(data, saltRounds);
  }

  async compare(plainText: string, hashedValue: string): Promise<Boolean> {
    if (!plainText || !hashedValue) {
        
        throw new StatusError(404, "Bad Request")
    }
    return await bcrypt.compare(plainText, hashedValue);
  }
}

export default HashServices;
