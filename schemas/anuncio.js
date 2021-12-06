const {mongoose} = require ("../config/db")
const {Schema} = mongoose



const anuncioSchema = new Schema(
    
    {
        titulo: String,
        descripcion: String,
        fechaPublicacion: Date,
        estado:String,

     }

)

const AnuncioModel = mongoose.model("Anuncios", anuncioSchema)
module.exports = {AnuncioModel}