const { signup, signin, authUser, logout } = require("../controllers/auth.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

const authRoute = require("express").Router()

authRoute.post("/signup",signup)
authRoute.post("/signin",signin)
authRoute.get("/user", authMiddleware, authUser)
authRoute.get("/logout", authMiddleware, logout)

module.exports = {authRoute}