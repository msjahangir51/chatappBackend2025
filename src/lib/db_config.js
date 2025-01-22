const mongoose = require("mongoose");
const { DB_URL } = require("./env.config");


const db_connection = async ()=>{
    try{
        const conn = await mongoose.connect(DB_URL);
        console.log("DB is connected ", conn.connection.host);

    }catch(error){
        console.log("DB error ", error.message)
    }
}

module.exports = {db_connection}