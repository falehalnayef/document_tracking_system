import File from "../../dto/file.js";
import { IFile, IFileRepository, IFileService } from "../../interfaces/business_interfaces/file.interfaces.js";
import { IUserService } from "../../interfaces/business_interfaces/user.interfaces.js";
import IValidator from "../../interfaces/utility_interfaces/validator.interface.js";
import StatusError from "../../utils/error.js";

class FileServices implements IFileService {
    private FileRepository: IFileRepository;
    private validator: IValidator;
    private userServices: IUserService;

    constructor(FileRepository: IFileRepository, userServices: IUserService, validator: IValidator) {
        this.FileRepository = FileRepository;
        this.userServices = userServices; 
        this.validator = validator;


    }

    


    async createFile(FileName: string, ownerId: number, isPublic: boolean, fileDate: object): Promise<IFile> {
        this.validator.validateRequiredFields({ FileName, ownerId, isPublic });

        const path = "Af";

        const File = await this.FileRepository.create(FileName, ownerId, isPublic, path, new Date());
        
        return File;
    }

    async index(owner_id: number): Promise<IFile[]> {
        this.validator.validateRequiredFields({ owner_id });

        const FileData = await this.FileRepository.getFilesByAttribute({owner_id});

        const Files: File[] = [];
        for (const File of FileData) {
          Files.push((File as IFile));
        }

        return Files;   
    }

    async getFile(FileId: number): Promise<IFile> {
        this.validator.validateRequiredFields({ FileId });

        const File = await this.FileRepository.getFile(FileId);
        if (!File) {
            throw new StatusError(404, "File not found.");
        }
        return (File);
    }

    async deleteFile(FileId: number, userId: number): Promise<number> {
        this.validator.validateRequiredFields({ FileId, userId });

        const File = await this.getFile(FileId);
        if (File.owner_id !== userId) {
            throw new StatusError(403, "Not allowed.");
        }

        const removedFile = await this.FileRepository.remove(FileId);
        if (removedFile !== 1) {
            throw new StatusError(404, "File is not found.");
        }

        return removedFile;
    }


   
}




export default FileServices;
