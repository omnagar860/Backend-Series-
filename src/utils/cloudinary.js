import { v2  as cloudinary } from "cloudinary"
import { log } from "console"
import fs from "fs" 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})  

const uploadOnCloudinary = async (constlocalFilePath) => {
  try {
    if(!localFilePath) return null ||" couldn't find local file"
    // upload on cloudinary
   const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type : "auto"
    })
    //file has been uploaded successfully
    console.log("file is uploaded successfully on cloudinary");
  console.log(response.url);
  return response
  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the locally save temporary file as the upload operation failed
    return null
  }
  
}