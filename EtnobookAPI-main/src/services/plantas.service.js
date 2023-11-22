import Plantas from '../models/Plantas.js'

const createService = (body) => Plantas.create(body)

const findAllService = () => Plantas.find()

//Encontra uma planta pelo nome científico, se chama findByNome para que o nome não fique gigante
const findByNomeService = (nomecientifico) => Plantas.findOne( { nomecientifico: nomecientifico } )

const updateService = (
    nome,
    nomecientifico,
    descricao,
    artigo
) => Plantas.findOneAndUpdate (
    { nomecientifico: nomecientifico },
    { nome, nomecientifico, descricao, artigo }
)

export { 
    createService, 
    findAllService,
    findByNomeService,
    updateService
}