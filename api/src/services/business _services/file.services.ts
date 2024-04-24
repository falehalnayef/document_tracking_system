import { IFile, IFileRepository, IFileService } from "../../interfaces/business_interfaces/file.interfaces.js";
import { FileData } from "../../interfaces/utility_interfaces/request.interface.js";
import IValidator from "../../interfaces/utility_interfaces/validator.interface.js";
import path, { dirname } from "path";

import FileUtility from "../utility_services/file_utility.service.js"
class FileServices implements IFileService {
    private FileRepository: IFileRepository;
    private validator: IValidator;
    public fileOperations: FileUtility;
    constructor(FileRepository: IFileRepository, validator: IValidator) {
        this.FileRepository = FileRepository;
        this.validator = validator;
        this.fileOperations = new FileUtility();


    }

    


    async createFile(ownerId: number, isPublic: boolean, fileData: FileData): Promise<IFile> {
        this.validator.validateRequiredFields({ fileData, ownerId, isPublic });

        const newFileName = fileData.filename
        const filePath = path.join(__dirname.split("api")[0], "uploads/", newFileName);

        this.fileOperations.save(fileData.data!, filePath);

        const file = await this.FileRepository.create(newFileName, ownerId, isPublic, filePath, new Date());
        
        return file;
    }

    // async index(owner_id: number): Promise<IFile[]> {
    //     this.validator.validateRequiredFields({ owner_id });

    //     const FileData = await this.FileRepository.getFilesByAttribute({owner_id});

    //     const Files: File[] = [];
    //     for (const File of FileData) {
    //       Files.push((File as IFile));
    //     }

    //     return Files;   
    // }

    // async getFile(FileId: number): Promise<IFile> {
    //     this.validator.validateRequiredFields({ FileId });

    //     const File = await this.FileRepository.getFile(FileId);
    //     if (!File) {
    //         throw new StatusError(404, "File not found.");
    //     }
    //     return (File);
    // }

    // async deleteFile(fileId: number, userId: number): Promise<number> {

    //     this.validator.validateRequiredFields({ fileId, userId });

    //     const File = await this.getFile(FileId);
    //     if (File.owner_id !== userId) {
    //         throw new StatusError(403, "Not allowed.");
    //     }

    //     const removedFile = await this.FileRepository.remove(FileId);
    //     if (removedFile !== 1) {
    //         throw new StatusError(404, "File is not found.");
    //     }

    //     return removedFile;
    // }


   
}




export default FileServices;
