const jwt = require("jsonwebtoken")
const { JWT_SECRET, NODE_SECRET } = require("./env.config")


// const genarateToken = async(userId,res)=>{
//     const token = jwt.sign({userId}, JWT_SECRET,{
//         expiresIn:"7d"
//     });

//     res.cookie("jwt",token,{
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly:true,
//         secure:NODE_SECRET !== "development",
//         sameSite:"strict"
//     })

//     return token
// }
const genarateToken = async (userId, res) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d", // Token valid for 7 days
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevent client-side access
        secure: process.env.NODE_SECRET === "production", // Only send over HTTPS in production
        sameSite: process.env.NODE_SECRET === "production" ? "none" : "lax", // Allow cross-origin in production
    });

    return token;
};


module.exports = {genarateToken}