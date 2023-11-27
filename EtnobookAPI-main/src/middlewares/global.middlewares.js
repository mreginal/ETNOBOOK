import mongoose from 'mongoose'
import userService from '../services/user.service.js'
import { findByNomeService } from '../services/plantas.service.js'

export const validId = (req, res, next) => {
    try {
        const id = req.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "ID inválido!" })
        }

        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export const validUser = async (req, res, next) => {
    try {
        const id = req.userId;

        const user = await userService.findByIdService(id)

        if (!user) {
            return res.status(400).send({ message: "Usuario não encontrado" })
        }

        req.id = id
        req.user = user

        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export const validPlanta = async (req, res, next) => {
    try {
        const { nomecientifico }  = req.body

        const planta = await findByNomeService(nomecientifico)

        if (!planta) {
            return res.status(400).send({ message: "Planta não encontrada!" })
        }

        req.planta = planta

        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }


}

export const confirmPlanta = async (req, res, next) => {
    try {
        const nomecientifico   = req.params.nomecientifico

        const planta = await findByNomeService(nomecientifico)

        if (!planta) {
            return res.status(400).send({ message: "Planta não encontrada!" })
        }

        req.planta = planta

        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
