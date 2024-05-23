import { Op, Transaction } from "sequelize";
import {
  IFile,
  IFileRepository,
} from "../../interfaces/business_interfaces/file.interfaces.js";

import db from "../database/db.js";
import { IBooking } from "../../interfaces/business_interfaces/booking.interfaces.js";
import { IArchive } from "../../interfaces/business_interfaces/archive.interfaces.js";

const File = db.FileModel;
const FileGroupModel = db.FileGroupModel;
const BookingModel = db.BookingModel;
const ArchiveModel = db.ArchiveModel;

class FileRepository implements IFileRepository {


  


  async getArchivedFilesByFileId(file_id: number): Promise<IArchive[]> {

    return await ArchiveModel.findAll({where:{file_id}});
  }
  

  async getBookings(file_id: number): Promise<IBooking[]> {
    const bookedFileEntity = await BookingModel.findAll({ where: { file_id } });

    return bookedFileEntity;
  }

  async getBookingsByUserId(user_id: number): Promise<IBooking[]> {
    const bookedFileEntity = await BookingModel.findAll({ where: { user_id } });

    return bookedFileEntity;
  }
  

  async updateBooking(
    booking_id: number,
    data: object,
    transaction?: Transaction
  ): Promise<void> {
    await BookingModel.update(
      data,
      {
        where: {
          booking_id,
        },
      },
      { transaction }
    );
  }

  async getActiveBooking(user_id: number, file_id: number): Promise<IBooking> {
    const bookedFileEntity = await BookingModel.findOne({
      where: { user_id, file_id, check_out_date: null },
    });

    return bookedFileEntity;
  }

  async update(
    file_id: number,
    data: object,
    transaction?: Transaction
  ): Promise<void> {
    await File.update(
      data,
      {
        where: {
          file_id,
        },
      },
      { transaction }
    );
  }

  async createBooking(
    file_id: number,
    user_id: number,
    check_in_date: Date,
    exp_date: Date,
    transaction?: Transaction
  ): Promise<object> {
    const bookedFile = await BookingModel.create(
      { file_id, user_id, check_in_date, exp_date, check_out_date: null },
      { transaction }
    );

    return bookedFile;
  }

  async getFileGroupEntity(
    group_id: number,
    attributes: string[]
  ): Promise<object> {
    const userGroupEntity = await FileGroupModel.findAll({
      where: { group_id },
      attributes,
    });

    return userGroupEntity;
  }

  async getFilesByAttribute(attributes: {
    [key: string]: any;
  }): Promise<IFile[]> {
    const whereClause: { [key: string]: any } = {};

    for (const key in attributes) {
      if (Array.isArray(attributes[key])) {
        whereClause[key] = { [Op.in]: attributes[key] };
      } else {
        whereClause[key] = attributes[key];
      }
    }

    const files = await File.findAll({ where: whereClause });
    return files;
  }
  async create(
    file_name: string,
    owner_id: number,
    path: string,
    date: Date,
    transaction?: Transaction
  ): Promise<IFile> {
    const file = await File.create(
      { file_name, owner_id, path, date },
      { transaction }
    );

    return file;
  }

  async remove(file_id: number, transaction?: Transaction): Promise<number> {
    const file = await File.destroy({ where: { file_id } }, { transaction });
    await this.removeArchived(file_id, transaction);
    return file;
  }


  async removeArchived(file_id: number, transaction?: Transaction): Promise<number> {

    const file = await ArchiveModel.destroy({ where: { file_id } }, { transaction });

    return file;
  }

  async getFile(file_id: number, include:any = null): Promise<IFile> {
    const file = await File.findByPk(file_id, {include});

    return file;
  }

  async checkFileGroupEntity(
    group_id: number,
    file_id: number
  ): Promise<Object> {
    const fileGroupEntity = await FileGroupModel.findOne({
      where: { group_id, file_id },
    });

    return fileGroupEntity;
  }
  async removeFileGroupEntity(
    group_id: number,
    file_id: number,
    transaction?: Transaction
  ): Promise<object> {
    const fileGroupEntity = await FileGroupModel.destroy(
      { where: { group_id, file_id } },
      { transaction }
    );

    return fileGroupEntity;
  }

  async createFileGroupEntity(
    group_id: number,
    file_id: number,
    transaction?: Transaction
  ): Promise<object> {
    const fileGroupEntity = await FileGroupModel.create(
      { group_id, file_id },
      { transaction }
    );

    return fileGroupEntity;
  }
  async getFilesByLike(
    likeAttribute: { [key: string]: any },
    filters: { [key: string]: any }
  ): Promise<object[]> {
    const whereClause: { [key: string]: any } = {};

    for (const key in likeAttribute) {
      whereClause[key] = { [Op.like]: `%${likeAttribute[key]}%` };
    }

    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        whereClause[key] = { [Op.in]: filters[key] };
      } else {
        whereClause[key] = filters[key];
      }
    }

    const files = await File.findAll({ where: whereClause });
    return files;
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

export default FileRepository;
