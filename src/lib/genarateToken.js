const jwt = require("jsonwebtoken")
const { JWT_SECRET, NODE_SECRET } = require("./env.config")


const genarateToken = async(userId,res)=>{
    const token = jwt.sign({userId}, JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        secure:NODE_SECRET !== "development",
        sameSite:"strict"
    })

    return token
}


module.exports = {genarateToken}