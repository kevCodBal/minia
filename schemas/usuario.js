const {mongoose} = require ("../config/db")


const {Schema} = mongoose



const usuarioSchema = new Schema(
    
    {
        nombre:String,
        correo:String,
        contrasena:String,
        rol:String
     }

)

const UsuariModel = mongoose.model("Usuarios", usuarioSchema)
module.exports = UsuariModel