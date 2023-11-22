import mongoose from 'mongoose'

const connectDatabase = ()=> {
    console.log('Tentando conectar ao banco de dados...')

    mongoose.Promise = global.Promise
    mongoose.connect(
        process.env.MONGODB_URI,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB Atlas Conectado'))
    .catch((error) => console.log(`Houve um erro ao tentar se conectar com o banco: ${error}`))
}

export default connectDatabase