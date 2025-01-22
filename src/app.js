const cors = require("cors");
const cookieparser = require("cookie-parser");
const { authRoute } = require("./routes/auth.route");
const { userRoute } = require("./routes/user.route");
const { messageRoute } = require("./routes/message.route");
 const {io,app,server, express} = require("./lib/socket")

// base middleware 
app.use(cors({
    origin: ["https://withme-chat.netlify.app"],
    credentials: true,
    methods: ['GET','PORT','PUT','DELETE']
}))
app.use(cookieparser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// end of base middleware 



// start of api 
app.use("/api/auth", authRoute)
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)
// end of api 


module.exports = { server }