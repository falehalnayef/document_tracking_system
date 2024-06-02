import fs from "fs/promises";
import path from "path";
import StatusError from "../../utils/error";

class FileUtility {
  async fExists(path: string) {
    return !!(await fs.stat(path).catch((_e) => false));
  }
  async createDir(dirPath: string) {
    if (!(await this.fExists(dirPath))) {
      try {
        await fs.mkdir(dirPath, { recursive: true });
      } catch (error) {
        throw error;
      }
    }
  }

  async save(buffer: Buffer, fileName: string) {
    const filePath = this.getPath(fileName);

    await fs.writeFile(await filePath, buffer);

    return filePath;
  }

  getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    var random = ("" + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number;
  }

  async deleteFile(filePath: string) {
    if (await this.fExists(filePath)) {
      await fs.unlink(filePath);
    }
  }

  async getPath(fileName: string) {
    const newFileName = this.getRandomFileName() + fileName;

    const filePath = path.join(
      __dirname.split("api")[0],
      "uploads/",
      newFileName
    );

    const directoryPath = path.dirname(filePath);

    await this.createDir(directoryPath);

    if (await this.fExists(filePath))
      throw new StatusError(409, "File already exists.");

    return filePath;
  }
}

export default FileUtility;
