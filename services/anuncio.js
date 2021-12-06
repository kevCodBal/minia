const {AnuncioModel} = require("../schemas/anuncio")


const anuncio = new AnuncioModel({name:"anuncio"})

class Anuncio{

    async getAnuncios(){

        try{

            const anuncios = await AnuncioModel.find()
            return anuncios || []
        }
        catch(error){
            console.log(error)
        }

    }

    async getAnuncio(id){
        const anuncio = await AnuncioModel.findById(id)

        return anuncio || {}
    }

    async createAnuncio(data){
    //             const resultado = productoSchemaJoi.validate(data)
    //             console.log(resultado.error.details[0].message)


    //     if(!validate.error){
    //     const productoGuardado = await ProductoModel.create(data)

    //     return{data:productoGuardado, success:true, message:"Producto creado exitosamente"}
    // }

    //     return {data:validate,success:false, message:validate.error.details[0].message}
        
        try{
            const anuncioCreate = await AnuncioModel.create(data)

            return { data:anuncioCreate, succcess:true, message:"Anuncio creado Exitosamente"}

        }catch(error){
            console.log("Error, al crear el anuncio", error.errors["nombre"].properties.message   )
        }

        return { data:validate.value, success:false, message:error.errors["nombre"].properties.message}
    }

    
    async updateAnuncio(id, data){             
        const anuncioActualizado = await AnuncioModel.findByIdAndUpdate(id, data)

        return anuncioActualizado || {}
    }



    async deleteAnuncio(id){
        const anuncioEliminado = await AnuncioModel.findByIdAndDelete(id)

        return anuncioEliminado || {}
    }

    async cambiarEstadoAnuncio(id, data){
        const estadoActualizado = await AnuncioModel.findByIdAndUpdate(id, data)

        return {message:"Estado de Anuncio Actualizado", succcess:true, estadoActualizado} ||  { "message": "Ocurrio Algun Error", usuario, success:false}
        
    }



}

module.exports = Anuncio