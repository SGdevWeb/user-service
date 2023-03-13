const userServices = require("../service/userServices");

const signinController = async (req, res, next) => {
  try {
    // Vérification de l'unicité de l'email
    const user = await userServices.getUserByEmail(req.body.email);
    if (user) {
      return res.status(400).json({
        message:
          "Cette adresse e-mail est déjà enregistrée, merci de modifier votre saisie",
      });
    }
    const result = await userServices.createUser(req.body);
    res.status(201).json({ message: result.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await userServices.login(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProfileUsersController = async (req, res) => {
  try {
    const profileUsers = await userServices.getAllProfileUsers();
    res.status(200).json({ profileUsers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserController = async (req, res) => {
  // console.log('entra la peticion :', req.params.userId)
  try {
    const { uuid } = req.params;
    // console.log(uuid);
    const user = await userServices.getUser(uuid);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signinController,
  loginController,
  getAllUsersController,
  getAllProfileUsersController,
  getUserController,
};
