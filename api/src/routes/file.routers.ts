import { Router } from "express";
import FileController from "../controllers/file.controller.js";
import MultipartMiddleware from "../middlewares/data_middlewares/multipart.middleware.js";

class FileRouter {


    public router: Router;
    private fileController: FileController;   
    private multiPartMiddleWare: MultipartMiddleware;

    constructor(FileController: FileController){

        this.router = Router();
        this.fileController = FileController;
        this.multiPartMiddleWare = new MultipartMiddleware();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
         this.router.post("/", this.multiPartMiddleWare.handleFileUpload, this.fileController.createFile.bind(this.fileController))
        this.router.get("/", this.fileController.index.bind(this.fileController))
        this.router.delete("/:file_id", this.fileController.deleteFile.bind(this.fileController))

    }
}


export default FileRouter;
