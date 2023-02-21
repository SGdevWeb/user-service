const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const jwtDecode = require('jwt-decode')

// const userServices = require('../service/userServices')
const User = require('../model/userModel')

const signin = async (req, res, next) => {
    // console.log(req.body, 'test userControllersignin')
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                uuid : uuidv4(),
                email: req.body.email,
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                username: req.body.username,
                password: hash,
                role: req.body.role
            });
            // console.log(user, 'test')
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.log('error signin')
            res.status(500).json({ error })
        })
};

const login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            // console.log('user ', user)
            if (user === null) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    const payload = {
                        expiresIn: '1h',
                        sub: user.uuid,
                        role: user.role
                    }
                    // const token = jwt.sign(
                    //     { userId: user.uuid }, 
                    //     process.env.JWT_KEY, 
                    //     { 
                    //         expiresIn: '24h',
                    //         subject: user.uuid,
                    //         role: user.role
                    //     }
                    // )
                    const token = jwt.sign(payload, process.env.JWT_KEY)
                    // console.log('token ', token)
                    // const decodedToken = jwtDecode(token)
                    // console.log('Token décodé',decodedToken)
                    res.status(200).json({
                        token: token
                    })
                })
                .catch(error => {
                    console.log('error catch bcrypt')
                    res.status(500).json({ error })
                });
        })
        .catch(error => {
            console.log('erreur catch usercontrollerLogin')
            res.status(500).json({ error })
        });
};

const getAllUsers =(req, res) => {
    console.log('req', req.auth)
    User.find()
        .then((response) => {
            console.log('response', response)
            res.status(200).json({ users: response})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error })
        })
}

module.exports = {
    signin,
    login,
    getAllUsers
}