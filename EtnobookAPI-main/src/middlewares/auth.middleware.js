import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.send(401)
        }

        const parts = authorization.split(" ")

        if (parts.length !== 2) {
            return res.send(401)
        }

        const [schema, token] = parts

        if (schema !== "Bearer") {
            return res.send(401)
        }

        jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
            if (error) {
                return res.status(401).send({message: "Token inválido"})
            }
            
            req.userId = decoded.id

            console.log(decoded)

            return next()
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}
