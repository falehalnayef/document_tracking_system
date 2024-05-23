import { Op, Transaction } from "sequelize";


import db from "../database/db.js";
import { IArchive, IArchiveRepository } from "../../interfaces/business_interfaces/archive.interfaces.js";

const ArchiveModel = db.ArchiveModel;

class ArchiveRepository implements IArchiveRepository {


  async getArchivedFilesByFileId(file_id: number): Promise<IArchive[]> {

    return await ArchiveModel.findAll({where:{file_id}});
  }


  async removeArchived(file_id: number, transaction?: Transaction): Promise<number> {

    const file = await ArchiveModel.destroy({ where: { file_id } }, { transaction });

    return file;
  }


  async createArchive(
    file_id: number,
    user_id: number,
    path: string,
    transaction?: Transaction
  ): Promise<void> {
    const archivedFile = await ArchiveModel.create(
      { file_id, user_id, path, date: new Date() },
      { transaction }
    );

    return archivedFile;
  }
}

export default ArchiveRepository;
