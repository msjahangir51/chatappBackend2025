const { getReceiverSocketId } = require("../lib/socket");
const { Message } = require("../models/Message");
const { User } = require("../models/User");
const {io} = require("../lib/socket")
const getLastMessageWithUserDetails = async (req, res) => {
    try {
        // Fetch all users except the current user
        const allUsers = await User.find({ _id: { $ne: req.user._id } }, "fullname profilePic");

        // Fetch all messages involving the current user
        const messages = await Message.find({
            $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
        })
            .sort({ timestamp: -1 }) // Sort messages by most recent first
            .populate("senderId", "fullname profilePic")
            .populate("receiverId", "fullname profilePic");

        const lastMessagesMap = new Map();

        // Iterate through messages to find the last message with each user
        for (const message of messages) {
            // Determine the "other user" in the conversation
            const otherUser =
                message.senderId._id.toString() === req.user._id.toString()
                    ? message.receiverId
                    : message.senderId;

            // If the user is not already in the map, add the last message
            if (!lastMessagesMap.has(otherUser._id.toString())) {
                lastMessagesMap.set(otherUser._id.toString(), {
                    _id: otherUser._id,
                    fullname: otherUser.fullname,
                    profilePic: otherUser.profilePic,
                    lastMessage: message.text,
                    timestamp: message.timestamp,
                });
            }
        }

        // Combine all users with the last message data
        const result = allUsers.map((user) => {
            if (lastMessagesMap.has(user._id.toString())) {
                return lastMessagesMap.get(user._id.toString());
            } else {
                return {
                    _id: user._id,
                    fullname: user.fullname,
                    profilePic: user.profilePic,
                    lastMessage: null,
                    timestamp: null,
                };
            }
        });

        // Send the result as a response
        res.status(200).send(result);
    } catch (error) {
        console.error("Error in getLastMessageWithUserDetails controller: ", error.message);
        res.status(500).send({ message: "Internal server error" });
    }
};




const loadMessages = async (req, res) => {
    try {
        // Extract request body parameters with default values
        const { skip = 0, limit = 10, receiverId } = req.query;


        console.log(receiverId)

        // Validate skip and limit parameters
        const skipValue = parseInt(skip, 10);
        const limitValue = parseInt(limit, 10);

        if (isNaN(skipValue) || skipValue < 0 || isNaN(limitValue) || limitValue <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid skip or limit values.",
            });
        }

        // Validate receiverId
        if (!receiverId) {
            return res.status(400).json({
                success: false,
                message: "Receiver ID is required.",
            });
        }

        // Fetch messages from the database
        const messages = await Message.find({
            $or: [
                { senderId: req.user._id, receiverId },
                { senderId: receiverId, receiverId: req.user._id },
            ],
        })
            .sort({ createdAt: 1 }) // Sort messages by newest first
            .skip(skipValue)         // Apply pagination skip
            .limit(limitValue);      // Limit the number of messages

        // Respond with the fetched messages
        return res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error("Error loading messages:", error);

        // Handle unexpected server errors
        return res.status(500).json({
            success: false,
            message: "Error loading messages.",
            error: error.message,
        });
    }
};

  
  

const sendMessage = async (req, res) => {
    const { text, receiverId } = req.body;
    try {
        const newMessage = new Message({
            senderId: req.user._id,
            receiverId,
            text
        })

        if (newMessage) {
            await newMessage.save();

            const receiverSocketId = getReceiverSocketId(receiverId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage", newMessage)
            }
            return res.status(200).send({ message: newMessage })
        }
    } catch (error) {
        console.log("Error in sendMessage controllers  : ", error.message);
        res.status(500).send({ message: "Internal server error" });
    }
};
module.exports = { getLastMessageWithUserDetails, loadMessages, sendMessage }