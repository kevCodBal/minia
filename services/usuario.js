const UsuarioModel = require("../schemas/usuario")

const usuario = new UsuarioModel({name:"usuario"})

class Usuarios {

    async getUsers(){

        try{

            const users = await UsuarioModel.find()
            return users || []
        }
        catch(error){
            console.log(error)
        }

    }

    async getUser(correo){
        const usuario = await UsuarioModel.findOne({correo}).exec()

        return usuario|| false
    }

    async createUser(data){
        const usuarioGuardado = await UsuarioModel.create(data)

        return usuarioGuardado|| { }

        // const usuarioExiste= this.getUser.(data.email)
        // const usuarioGuardado = await 
    }

    async updateUser(id, data){             
        const userUpdate = await UsuarioModel.findByIdAndUpdate(id, data)

        return userUpdate || {}
    }

    async deleteUser(id){
        const userDelete = await UsuarioModel.findByIdAndDelete(id)

        return userDelete || {}
    }



}

module.exports = Usuarios