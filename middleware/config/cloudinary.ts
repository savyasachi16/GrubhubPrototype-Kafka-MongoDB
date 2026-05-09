import { v2 as cloudinary } from 'cloudinary';
import { Request, Response, NextFunction } from 'express';

const config = cloudinary.config;
const uploader = cloudinary.uploader;

const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
    config({
        cloud_name: 'savya-cloudinary',
        api_key: '565435984852792',
        api_secret: '9CeQ9Ei2r-BVyo39US03imUFLtM',
    })
    next()
}
export {
    cloudinaryConfig,
    uploader
};
