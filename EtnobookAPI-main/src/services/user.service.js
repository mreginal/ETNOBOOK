import User from "../models/User.js"

const createService = (body) => User.create(body)

const findAllService = () => User.find()

const findByIdService = (id) => User.findById(id)

const updateService = (
    id,
    name,
    lastname,
    birthdate,
    gender,
    address,
    phonenumber,
    email,
    password
) => User.findOneAndUpdate(
    { _id: id },
    { name, lastname, birthdate, gender, address, phonenumber, email, password }
)

export default {
    createService,
    findAllService,
    findByIdService,
    updateService
}