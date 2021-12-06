const jwt = require("jsonwebtoken")
const Usuarios = require("./usuario")
const config = require("../config/index")
const brcrypt = require("bcrypt")


class Auth{

    usuarios = new Usuarios()


    //Hash enctyptacion
    async hashPassword(password){
        const salt = await brcrypt.genSalt(10)
        const hash = await brcrypt.hash(password, salt)

        return hash
    }
    

    async login(correo, contrasena){
       const usuario= await this.usuarios.getUser(correo)
 
        if(usuario){
             const contrasenaCorrecta = await brcrypt.compare(contrasena, usuario.contrasena)
             if(contrasenaCorrecta){
                 
                 const token =  jwt.sign({correo, rol:usuario.rol}, config.jwt_secret,{
                     expiresIn:"1d"
                 })
                 return {token, usuario, success:true}
             }
        }
 
        return { "message": "Credenciales Incorectas",  success:false}
 
     }


     async registro(correo, contrasenaOriginal,nombre, rol){

        const contrasena = await this.hashPassword(contrasenaOriginal)
       const usuario= await this.usuarios.createUser({correo, contrasena, nombre, rol})
 
        if(usuario){
             return {"message": "Registro Exitoso", success:true, usuario}
        }
 
        return { "message": "Credenciales Incorectas", usuario, success:false}
 
     }

     async cambiarRol(id, rol){
            const usuario = await this.usuarios.updateUser(id, {rol})

            if(usuario){
                return {"message": "Usuario Actualizado", success:true, usuario}
           }
    
           return { "message": "Ocurrio Algun Error", usuario, success:false}
    
     }


}

module.exports= Auth