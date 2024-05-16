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
        this.router.post("/", this.multiPartMiddleWare.handleFileUpload, this.fileController.createFile.bind(this.fileController));
        this.router.get("/search/:groupId/:fileName", this.fileController.searchForFiles.bind(this.fileController));
        this.router.get("/:groupId", this.fileController.index.bind(this.fileController));
        this.router.delete("/:groupId/:fileId", this.fileController.deleteFile.bind(this.fileController));
        this.router.get("/:groupId/checkIn", this.fileController.checkIn.bind(this.fileController));
        this.router.post("/:groupId/:fileId/checkOut", this.fileController.checkOut.bind(this.fileController));
        this.router.get("/:groupId/:fileId/bookings", this.fileController.getBookingHistory.bind(this.fileController));

    }
}


export default FileRouter;
