import userService from '../services/user.service.js'

const create = async (req, res) => {
    try {
        const confirmpassword = req.body.confirmpassword
        const { name, lastname, birthdate, gender, address, phonenumber, email, password } = req.body

        if (!name || !lastname || !birthdate || !gender || !address || !email || !password || !confirmpassword) {
            return res.status(400).send({ message: "Informe todos os campos obrigatorios para registro" })
        }

        if (confirmpassword != password) {
            return res.status(400).send({ message: "A confirmação de senha está incorreta!" })
        }

        const user = await userService.createService({ 
            name, 
            lastname, 
            birthdate, 
            gender, 
            address, 
            phonenumber, 
            email, 
            password 
        })

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar o usuário" })
        }

        res.status(201).send({
            message: "Usuario criado com sucesso",
            user: {
                id: user._id,
                name,
                lastname,
                birthdate,
                gender,
                address,
                email
            },
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService()

        if (users.length === 0) {
            return res.status(400).send({ message: "Não há usuarios cadastrados" })
        }

        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {
        const user = req.user

        res.send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { name, lastname, birthdate, gender, address, phonenumber, email, password, confirmpassword } = req.body

        if (!name && !lastname && !birthdate && !gender && !address && !email && !password && !confirmpassword) {
            return res.status(400).send({ message: "Informe pelo menos um campo para atualização" })
        }

        const id = req.id

        const user = req.user

        await userService.updateService(
            id,
            name,
            lastname,
            birthdate,
            gender,
            address,
            phonenumber,
            email,
            password
        )

        res.send({ message: "Usuário atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { create, findAll, findById, update }