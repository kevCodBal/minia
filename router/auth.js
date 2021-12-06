const express = require("express")
const {  validarToken, validarTokenPublicador, validarTokenAdmin} = require("../midelwere/authValidation")

const Auth = require("../services/auth")


function auth(app){
     const router = express.Router();
     app.use("/dir/auth", router)

     const authService = new Auth()

     router.post('/login', async (req, res) => {

        const{correo,  contrasena } = req.body
         const result= await authService.login(correo, contrasena)
        
        if(result.success){

            return res.cookie("token", result.token,{httpOnly:true})
            .status(200)
            .json({nombre:result.usuario.nombre})
        }

        return res.status(404).json(result);
    })

    router.post('/signup', validarTokenAdmin , async (req, res) => {

        const{correo,  contrasena, nombre, rol} = req.body
        const result= await authService.registro(correo, contrasena, nombre, rol)
        
        if(result.success){

            return res.status(201).json({nombre:result.usuario.nombre})
        }

        return res.status(404).json(result);
    })

    router.put('/cambiar_rol/:id', validarTokenAdmin, async (req, res) => {

        const{rol} = req.body
        const{id} = req.params

         const result= await authService.cambiarRol(id,rol )
        
        if(result.success){

            return res.status(200).json({nombre:result.usuario.nombre})
        }

        return res.status(404).json(result);
    })



}

module.exports = auth