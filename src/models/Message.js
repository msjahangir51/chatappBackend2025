const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    } // Manually add timestamp if needed
}, { timestamps: true }); // The { timestamps: true } will also add createdAt and updatedAt

// const Message = mongoose.model("Message", messageSchema);


const Message = mongoose.model("Message", messageSchema)

module.exports = { Message }