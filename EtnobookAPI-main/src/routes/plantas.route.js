import { Router } from 'express'
import { create, findAll, findByNome, update, findByFilter } from '../controllers/plantas.controller.js'
import { validPlanta, confirmPlanta } from "../middlewares/global.middlewares.js"

const router = Router()

router.post('/', create) //Cria uma planta
router.get('/', findAll) //Retorna todas as plantas
router.post('/find', validPlanta, findByNome) //Busca pelo nome científico
router.post('/filter', findByFilter) //Busca utilizando um filtro de palavras
router.patch('/:nomecientifico', confirmPlanta, update) //Atualiza uma planta com base no nome científico

export default router