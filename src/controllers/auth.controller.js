const bcryptjs = require("bcryptjs");
const { genarateToken } = require("../lib/genarateToken");
const { User } = require("../models/User");


const signup = async (req, res) => {
    const { fullname, username, password } = req.body;
    try {
        if (!fullname || !username || !password) {
            return res.status(400).send({ message: "All Fields are required!" });
        }
        const axistsUsername = await User.findOne({ username });
        if (axistsUsername) return res.status(400).send({ message: "username Already axists" });
        
        const salt = await bcryptjs.genSalt(10);
        console.log("ami aici ai porjonto")
        const hash = await bcryptjs.hash(password, salt)
        const newUser = new User({
            fullname,
            username,
            password: hash
        })

        if (newUser) {
            console.log(newUser)
            genarateToken(newUser._id, res);
            await newUser.save()
            res.status(201).send({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
        console.log("Eroor in signup controoler : ", error.message)
    }

}
const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) return res.status(400).send({ message: "All fields are required!" })

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send({ message: "Your username is wrong!" });

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) return res.status(400).send({ message: "Your password is wrong!" })

        genarateToken(user._id, res);

        res.status(200).send({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
        })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
        console.log("Error in signin controoler : ", error.message)
    }
}


const authUser = async (req, res) => {
    const user = req.user;
    try {
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
        console.log("Error in authUser controller : ", error.message)
    }
}


const logout = async (req,res)=>{
    try {
        res.cookie("jwt","", {
            maxAge:0
        })

        res.status(200).send({message:"Logout succesfully"})
    } catch (error) {
        res.status(400).send({message:"Internal server error"});
        console.log("Error in logout controller ", error.message)
    }
}




module.exports = { signin, signup, authUser ,logout}