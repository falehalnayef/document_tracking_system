import { Router } from "express";
import FileController from "../controllers/file.controller.js";
import MultipartMiddleware from "../middlewares/handlers/multipart.handler.js";

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
        this.router.get("/search/:group_id/:file_name", this.fileController.deleteFile.bind(this.fileController))
        this.router.get("/:group_id", this.fileController.index.bind(this.fileController))
        this.router.delete("/:group_id/:file_id", this.fileController.deleteFile.bind(this.fileController))

    }
}


export default FileRouter;
