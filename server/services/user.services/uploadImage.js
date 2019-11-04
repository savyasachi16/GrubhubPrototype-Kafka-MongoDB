import {
    uploader
} from "../../config/cloudinary"

const handle_request = async (file, callback) => {
    let result = await uploader.upload(file, {
        transformation: [{
            width: 175,
            height: 125,
            crop: "scale"
        }]
    })
    const image = result.url;
    callback(null, {
        image
    })
}

export {
    handle_request
};