const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// const userServices = require('../service/userServices')
const User = require('../model/userModel')
const User_profile = require('../model/userProfileModel')

const signin = async (req, res, next) => {
    // console.log(req.body, 'test userControllersignin')
    const userProfileUuid = uuidv4()
    const userUuid = uuidv4()

    const userProfile = new User_profile({
        uuid : userProfileUuid,
        description: '',
        date_birth: '',
        city: '',
        work: '',
        experience: [],
        soft_skill: [],
        uuid_user: userUuid
    });
    // console.log('userProfile', userProfile)
    userProfile.save()
        .then(() => {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        uuid : userUuid,
                        email: req.body.email,
                        lastname: req.body.lastname,
                        firstname: req.body.firstname,
                        username: req.body.username,
                        password: hash,
                        role: "user",
                        profile: userProfileUuid,
                    });
                    // console.log('user', user)
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                        .catch(error => res.status(400).json({ error }))
                })
                .catch(error => res.status(500).json({ error }))
            })       
        .catch(error => res.status(500).json({ error }))
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
                    const token = jwt.sign(payload, process.env.JWT_KEY)
                    // console.log('token ', token)
                    res.status(200).json({
                        token: token
                    })
                })
                .catch(error => {
                    res.status(500).json({ error })
                });
        })
        .catch(error => {
            res.status(500).json({ error })
        });
};

const getAllUsers =(req, res) => {
    console.log('req', req.auth)
    User.find()
        .then((response) => {
            res.status(200).json({ users: response})
        })
        .catch(error => {
            res.status(500).json({ error })
        })
};

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { firstname, lastname, email } = user;
      return res.status(200).json({ firstname, lastname, email });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


module.exports = {
    signin,
    login,
    getAllUsers,
    getUserById
}