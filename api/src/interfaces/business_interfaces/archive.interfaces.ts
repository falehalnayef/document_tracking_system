import { Transaction } from "sequelize";

interface IArchiveAttributes {
  archive_id: number;
  file_id: number;
  user_id: number;
  path: string;
  date: Date;
}

interface IArchive extends IArchiveAttributes {}

interface IArchiveRepository {
  createArchive(
    file_id: number,
    user_id: number,
    path: string,
    transaction?: Transaction
  ): Promise<void>;
  getArchivedFilesByFileId(file_id: number): Promise<IArchive[]>;
  removeArchived(file_id: number, transaction?: Transaction): Promise<number>;
}

export { IArchiveAttributes, IArchive, IArchiveRepository };
