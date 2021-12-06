const express = require('express');
const {connection}= require("./config/db")
const cookie= require("cookie-parser")
const auth = require("./router/auth")
const anuncio = require("./router/anuncio")
const usuario = require("./router/usuarios")

const app = express()

//Midelwere
app.use(express.json());
app.use(cookie())

//Listener
const server= app.listen(4000)


//Conecction
connection()


//Routers
auth(app)
anuncio(app)
usuario(app)


process.on('undhandLedReject', (err, primese)=>{
    console.log('Error', err.message)
    server.close(()=> process.exit(1))
    
})