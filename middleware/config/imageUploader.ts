import { uploader } from "./cloudinary.js"

const handleUpload = async (file: string) => {
    let result = await uploader.upload(file, {
        transformation: [{
            width: 175,
            height: 125,
            crop: "scale"
        }]
    })
    const image = result.url;
    return ({
        image
    })
}
export {
    handleUpload
};
