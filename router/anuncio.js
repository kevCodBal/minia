const  express = require('express')
const {  validarToken, validarTokenPublicador, validarTokenAdmin} = require("../midelwere/authValidation")
const Anuncios = require("../services/anuncio")



function anuncios(app){
    const router = express.Router()

    app.use("/dir/anuncios", router)

    const anuncioServices = new Anuncios()

    router.get('/',   async (req, res) => {
        const anuncios = await anuncioServices.getAnuncios
        res.status(200).json(anuncios)
    })

    router.get('/:id', async (req, res) => {
       const id = req.params.id
       const anuncio = await anuncioServices.getAnuncio(id)
       res.status(200).json(anuncio)
   })

    router.post('/', validarTokenPublicador , async (req, res) => {
        const data = req.body
        
         const anuncioCreate = await anuncioServices.createAnuncio(data)
           res.status(anuncioCreate.success?201:400).json(anuncioCreate);
    });


    router.put('/:id', validarTokenAdmin,async (req, res) => {
       const data = req.body
       const id = req.params.id

       const anuncioActualizado = await anuncioServices.updateAnuncio(id,data)
       res.status(201).json(anuncioActualizado);

    })

    router.put('/estado/:id', validarTokenAdmin ,async (req, res) => {
        const data = req.body
        const id = req.params.id
 
        const estadoActualizado = await anuncioServices.cambiarEstadoAnuncio(id, data)
        res.status(201).json(estadoActualizado);
 
     })


    router.delete('/:id', async(req, res) => {
       const id = req.params.id

       const anuncioEliminado = await anuncioServices.deleteAnuncio(id)
       res.status(201).json(anuncioEliminado);
   
   })

}

module.exports = anuncios