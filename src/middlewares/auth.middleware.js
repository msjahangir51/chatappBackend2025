const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../lib/env.config");
const { User } = require("../models/User");
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (!token) return res.status(401).send({ message: "Unauthorized - no Token Provided" })
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) return res.status(401).send({ message: "Unauthorized - Invalid token" });
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).send({ message: "User not found!" });
        req.user = user;
        next()
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
        console.log("Error in auth middleware : ", error.message)
    }
}


module.exports = { authMiddleware }