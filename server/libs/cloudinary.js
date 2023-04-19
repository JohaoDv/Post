import {v2 as cloudinary} from 'cloudinary'
import {CLOUD_NAME,API_KEY,API_SECRET} from '../config.js'
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})
export const  updateImage = async(filepath)=>{
  return await cloudinary.uploader.upload(filepath,{
    folder: "stack"
  })
}
export const deleteImage = async (id)=>{
  await cloudinary.uploader.destroy(id)
}