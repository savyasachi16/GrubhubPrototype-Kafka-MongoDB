import {
    config,
    uploader
} from 'cloudinary';

const cloudinaryConfig = (req, res, next) => {
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