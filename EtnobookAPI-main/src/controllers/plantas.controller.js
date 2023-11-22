import { createService, findAllService, findByNomeService, updateService } from '../services/plantas.service.js'

const create = async (req, res) => {
    try {
        const { nome, nomecientifico, descricao, artigo } = req.body

        if (!nome || !nomecientifico) {
            return res.status(400).send({ message: "Informe todos os campos obrigatorios para registro" })
        }

        const planta = await createService({
            nome,
            nomecientifico,
            descricao,
            artigo
        })

        if (!planta) {
            return res.status(400).send({ message: "Erro ao cadastrar a planta" })
        }

        res.status(201).send({
            message: "Planta registrada com sucesso",
            planta: {
            nome,
            nomecientifico,
            descricao,
            artigo
            },
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        const plantas = await findAllService()

        if (plantas.length === 0) {
            return res.status(400).send({ message: "Não há usuarios cadastrados" })
        }

        res.send(plantas)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findByNome = async (req, res) => {
    try {
        const planta =  req.planta

        res.send(planta)
    } catch (error) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { nome, nomecientifico, descricao, artigo } = req.body

        if (!nome && !nomecientifico && !descricao && !artigo) {
            return res.status(400).send({ message: "Informe pelo menos um campo para atualização" })
        }

        await updateService(
            nome,
            nomecientifico,
            descricao,
            artigo
        )

        res.send({ message: "Planta atualizada com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { create, findAll, update, findByNome }