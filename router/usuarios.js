const express = require('express');

 const Usuarios = require("../services/usuario")


function usuario(app){
    const router = express.Router()
    app.use("/api/usuarios", router);

    const usuarioService = new Usuarios()

    router.get('/', async (req, res)=>{
        const users = await usuarioService.getUsers()
        res.status(200).json(users);
    })

}

module.exports = usuario
