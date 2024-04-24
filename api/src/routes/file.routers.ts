import { Router } from "express";
import FileController from "../controllers/file.controller.js";
import MultipartMiddleware from "../middlewares/data_middlewares/multipart.middleware.js";
import errorHandler from "../middlewares/errors_middlewares/error.handler.middlware.js"

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
        this.router.post("/", this.multiPartMiddleWare.handleFileUpload, this.fileController.createFile.bind(this.fileController), errorHandler)
    }
}


export default FileRouter;
