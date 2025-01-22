const { getLastMessageWithUserDetails, sendMessage, loadMessages } = require("../controllers/message.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const messageRoute = require("express").Router();


messageRoute.get("/sidebarUser", authMiddleware, getLastMessageWithUserDetails)
messageRoute.post("/send-message", authMiddleware, sendMessage)
messageRoute.get("/load-message", authMiddleware, loadMessages)

module.exports = {messageRoute}