const { authMiddleware } = require("../middlewares/auth.middleware");
const {updatedateOfbirth,updatefullname,updategender,updatepassword,updateusername, updateProfile} = require("../controllers/user.controller")
const userRoute = require("express").Router();

userRoute.put("/update-fullname", authMiddleware, updatefullname)
userRoute.put("/update-username", authMiddleware, updateusername)
userRoute.put("/update-gender", authMiddleware, updategender)
userRoute.put("/update-dateOfbirth", authMiddleware, updatedateOfbirth)
userRoute.put("/update-password", authMiddleware, updatepassword)
userRoute.put("/update-profile", authMiddleware, updateProfile)

module.exports = {userRoute}