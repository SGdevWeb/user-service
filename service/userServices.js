const User = require('../model/userModel')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt');

const createUser = async (user) => {
    const {password} = user
    bcrypt.hash(password, 10)
        .then(hash => {
            const newUser = new User({
                uuid : uuidv4(),
                ...user,
                password: hash,
            });
        newUser.save()
            .then(() => { 'Utilisateur crée !' })
            .catch(error => { error });
    })
    .catch(error => { error })
}

module.exports = {
    createUser
}