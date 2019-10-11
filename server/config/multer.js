import multer from "multer";
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploads = multer({
    storage
}).single("file");
const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export {
    multerUploads,
    dataUri
};
