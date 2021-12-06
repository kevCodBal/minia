
const jwt = require("jsonwebtoken")
 const conf = require("../config")

 const obtenerRol =(token, validacion, req, res, next) =>{

    if(!token){
        return res.status(403).json({message:"Se necesita un Token"});
    }


    try{
        const decodedToken = jwt.verify(token, conf.jwt_secret)
        const {rol}= decodedToken


        if(validacion === "cliente"){

        } else if(validacion === "publicador" && (rol ==="admin" || rol === "publicador")){
            req.usuario = decodedToken
            return next()
        }else if (validacion === "admin" && rol ==="admin"){
            req.usuario = decodedToken
            return next()
        }else if (validacion === "publicador" && rol ==="publicador"){
            req.usuario = decodedToken
            return next()
        }
    }catch(error){
        return res.status(403).json({message:"Token Invalido"})
    }

    return res.status(403).json({message:"No cuenta con Permisos Necesarios"})

 }

 const validarToken =(req, res, next) =>{
     const {token} = req.cookies

     return obtenerRol(token, "cliente", req, res, next)
 }

 const validarTokenPublicador =(req, res, next) =>{
    const {token} = req.cookies

    return obtenerRol(token, "publicador", req,res, next)
}


const validarTokenAdmin =(req, res, next) =>{
    const {token} = req.cookies

    return obtenerRol(token, "admin", req,res, next)
}


module.exports ={ validarToken, validarTokenPublicador, validarTokenAdmin}