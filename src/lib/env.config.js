require("dotenv").config();

const PORT = process.env.PORT;
const NODE_SECRET = process.env.NODE_SECRET;
const DB_URL= process.env.DB_URL;
const JWT_SECRET= process.env.JWT_SECRET;
const CLOUDINARY_CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;


module.exports ={PORT,NODE_SECRET,DB_URL,JWT_SECRET,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_SECRET,CLOUDINARY_API_KEY}