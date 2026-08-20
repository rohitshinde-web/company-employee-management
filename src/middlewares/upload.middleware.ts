import path from "path";
import { FileSystemUtil } from "../utils/fileSystem.util";
import multer, { FileFilterCallback } from "multer";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants/statusCodes";

const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads/profiles');
FileSystemUtil.ensureDirectoryExists(UPLOAD_DIR);

const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) =>{
        cb(null, UPLOAD_DIR);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) =>{
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const fileExtension = path.extname(file.originalname).toLowerCase();
        cb(null, `profile-${uniqueSuffix}${fileExtension}`);
    }
});

const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) =>{
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(
            new AppError(
                `Invalid file type. Only JPEG, PNG, and WEBP images uploads are permitted.`,
                HTTP_STATUS.BAD_REQUEST
            )
        )
    }
}

export const uploadProfileImage = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
})