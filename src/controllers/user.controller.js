const { User } = require("../models/User");
const cloudinary = require("../lib/cloudinary")
const updatefullname = async (req, res) => {
    const { fullname } = req.body;
    try {
        const updatefullname_new = await User.findByIdAndUpdate(req.user._id, { fullname }, { new: true });
        res.status(200).send({ success: true, updatefullname_new })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
        console.log("Error in updatefullname controller ", error.message)
    }
}
const updateusername = async (req, res) => {
    const { _id, username } = req.body;
    try {
        const updateusername_new = await User.findByIdAndUpdate(req.user._id, { username }, { new: true });
        res.status(200).send({ success: true, updateusername_new })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
        console.log("Error in updateusername controller ", error.message)
    }
}
const updategender = async (req, res) => {
    const { _id, gender } = req.body;
    try {
        const updategender_new = await User.findByIdAndUpdate(req.user._id, { gender }, { new: true });
        res.status(200).send({ success: true, updategender_new })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
        console.log("Error in updategender controller ", error.message)
    }
}
const updatedateOfbirth = async (req, res) => {
    const { _id, dateOfbirth } = req.body;
    try {
        const dateOfbirth_new = await User.findByIdAndUpdate(req.user._id, { dateOfbirth }, { new: true });
        res.status(200).send({ success: true, dateOfbirth_new })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
        console.log("Error in updatedateOfbirth controller ", error.message)
    }
}
const updatepassword = async (req, res) => {
    const { _id, password } = req.body;
    try {
        const password_new = await User.findByIdAndUpdate(req.user._id, { password }, { new: true });
        res.status(200).send({ success: true, password_new })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
        console.log("Error in updatepassword controller ", error.message)
    }
}
const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      console.log("ami anu")
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { updatedateOfbirth, updatefullname, updategender, updatepassword, updateusername , updateProfile }