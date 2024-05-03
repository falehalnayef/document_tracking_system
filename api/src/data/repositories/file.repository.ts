import { Op, Transaction } from "sequelize";
import { IFile, IFileRepository } from "../../interfaces/business_interfaces/file.interfaces.js";


import db from "../database/db.js";

const File = db.FileModel;
const FileGroupModel = db.FileGroupModel;


class FileRepository implements IFileRepository{

   async getFileGroupEntity(group_id: number, attributes: string[]): Promise<object> {
        const userGroupEntity = await FileGroupModel.findAll({where:{group_id}, attributes});

        return userGroupEntity;    
      }
  
   

    async getFilesByAttribute(attributes: {[key: string]: any}): Promise<object[]> {

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
   async create(file_name: string, owner_id: number, is_public: boolean, path: string, date: Date, transaction?:Transaction): Promise<IFile> {



    const file = await File.create({file_name, owner_id, is_public, path, date}, {transaction});

        return file;
    }


    async remove(file_id: number, transaction?:Transaction): Promise<number> {

        const file = await File.destroy({where:{file_id}}, {transaction});

        return file;
    }

    async getFile(file_id: number): Promise<IFile> {

        const file = await File.findByPk(file_id);
    
        return file;
    
    }


 async checkFileGroupEntity(group_id: number, file_id: number): Promise<Object> {

        const fileGroupEntity = await FileGroupModel.findOne({where:{group_id, file_id}});

        return fileGroupEntity;

    }
async removeFileGroupEntity(group_id: number, file_id: number, transaction?:Transaction): Promise<object> {
    const fileGroupEntity = await FileGroupModel.destroy({where:{group_id, file_id}}, {transaction});

    return fileGroupEntity;    
}

async createFileGroupEntity(group_id: number, file_id: number, transaction?:Transaction): Promise<object> {
    const fileGroupEntity = await FileGroupModel.create({group_id, file_id}, {transaction});

    return fileGroupEntity;
}
}

export default FileRepository;