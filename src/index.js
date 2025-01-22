const {server} = require("./app");
const { db_connection } = require("./lib/db_config");
const {PORT} = require("./lib/env.config");



server.listen(PORT,()=>{
    db_connection()
    console.log(`server is running at http://localhost:${PORT}`)
})