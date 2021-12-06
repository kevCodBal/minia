const mongoose = require("mongoose")
const conf= require("./index")


async function connection(){
    
    const connect = await mongoose.connect(`mongodb+srv://kevin:${conf.password}@holamundo.9wvzs.mongodb.net/directorio?retryWrites=true&w=majority`)
    console.log("Conecction Data Base", connect.connection.host)
}


module.exports = {mongoose, connection}