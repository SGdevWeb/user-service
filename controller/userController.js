const userServices = require("../service/userServices");

const signinController = async (req, res, next) => {
  try {
    const result = await userServices.createUser(req.body);
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
};

const getAllProfileUsersController = async (req, res) => {
  try {
    const profile = await userServices.getAllProfileUsers();
    res.status(200).json({ profiles: profile });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUserController = async (req, res) => {
  console.log("getUserController", req.params);
  // console.log('entra la peticion :', req.params.userId)
  try {
    const { uuid } = req.params;
    // console.log(uuid);
    const user = await userServices.getUser(uuid);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  signinController,
  loginController,
  getAllUsersController,
  getAllProfileUsersController,
  getUserController,
};
