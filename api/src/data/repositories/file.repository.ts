import { Op } from "sequelize";
import { IFile, IFileRepository } from "../../interfaces/business_interfaces/file.interfaces.js";


import db from "../database/db.js";

const File = db.FileModel;


class FileRepository implements IFileRepository{
  


   async create(file_name: string, owner_id: number, is_public: boolean, path: string, date: Date): Promise<IFile> {


    const file = await File.create({file_name, owner_id, is_public, path, date});

        return file;
    }


//    async getFilesByAttribute(attributes: { [key: string]: any; }): Promise<object[]> {
//         const whereClause: { [key: string]: any } = {};

//         for (const key in attributes) {
//             if (Array.isArray(attributes[key])) {
//                 whereClause[key] = { [Op.in]: attributes[key] };
//             } else {
//                 whereClause[key] = attributes[key];
//             }
//         }
    
//         const files = await File.findAll({ where: whereClause });
//         return files;    }
   
//    async getFile(File_id: number): Promise<IFile> {

//     const file = await File.findByPk(File_id);

//     return file;

// }

//     async remove(File_id: number): Promise<number> {

//         const file = await File.destroy({where:{File_id}});

//         return file;
//     }




}

export default FileRepository;