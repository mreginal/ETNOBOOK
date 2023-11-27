import Plantas from '../models/Plantas.js'

const createService = (body) => Plantas.create(body)

const findAllService = () => Plantas.find()

//Encontra uma planta pelo nome científico, se chama findByNome para que o nome não fique gigante
const findByNomeService = (nomecientifico) => Plantas.findOne( { nomecientifico: nomecientifico } )

const findByFilterService = (nome) => Plantas.find({
    $or: [
      { nome: { $regex: nome, $options: 'i' } }, // 'i' para ser case-insensitive
      { nomecientifico: { $regex: nome, $options: 'i' } }
    ]
  }
)

const updateService = (
    nome,
    nomecientifico,
    tempnome,
    descricao,
    artigo,
    imagem
) => Plantas.findOneAndUpdate (
    { nomecientifico: tempnome },
    { nome, nomecientifico, descricao, artigo, imagem }
)

export { 
    createService, 
    findAllService,
    findByNomeService,
    updateService,
    findByFilterService
}