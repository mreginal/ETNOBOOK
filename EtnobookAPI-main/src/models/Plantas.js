import mongoose from 'mongoose'

const PlantasSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    nomecientifico: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String
    },
    artigo: {
        type: Array
    },
    imagem: {
        type: String
    }
})

const Plantas = mongoose.model('Plantas', PlantasSchema)

export default Plantas

