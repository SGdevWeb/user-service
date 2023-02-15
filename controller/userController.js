const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const User = require('../model/User')

exports.signin = (req, res, next) => {
    // Lorsque le corps de la requête est un objet vide
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Saisie incorrecte' });
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                uuid : uuidv4(),
                email: req.body.email,
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                username: req.body.username,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Saisie incorrecte' });
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    const token = jwt.sign(
                        { userId: user.uuid }, 
                        process.env.JWT_KEY, 
                        { expiresIn: '24h' }
                    )
                    res.status(200).json({
                        userId: user.uuid,
                        token: token
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};