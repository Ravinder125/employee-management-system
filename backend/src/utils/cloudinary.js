import { v2 as cloudinary } from 'cloudinary';


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
    const upload = await cloudinary.uploader
        .upload(localFilePath)
        .then(result => console.log('File successfully uploaded on cloudinary', result))
        .catch((error) => console.error('Error while uploading image on cloudinary', error))

}




export { uploadOnCloudinary }