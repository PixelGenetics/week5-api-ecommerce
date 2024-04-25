const User = require('../models/User')

const userCreate = async() => {
    const user = {
        firstName: "Ana",
        lastName: "Lisseth",
        email:"analisa@gmail.com",
        password:"kamskdsa",
        phone:"12312312"
    }

    await User.create(user)
}

module.exports = userCreate