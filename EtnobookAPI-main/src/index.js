import express from 'express'
import connectDatabase from './database/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import plantasRoute from './routes/plantas.route.js'

dotenv.config()

const app = express()

//Config
    //Conexão com o banco
        connectDatabase()

//Rotas
    app.use(express.json())
    app.use(cors())

    app.use('/user', userRoute)
    app.use('/auth', authRoute)
    app.use('/plantas', plantasRoute)    

//Função utilizada para abrir uma conexão com o cliente
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})