import multer from "multer";
import DatauriParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploads = multer({
    storage
}).single("file");
const dUri = new DatauriParser();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export {
    multerUploads,
    dataUri
};
