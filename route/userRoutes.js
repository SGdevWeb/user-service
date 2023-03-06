const express = require("express");
const router = express.Router();
const DTO = require("../dto/dtos");

const userController = require("../controller/userController");

router.post("/signin", DTO.user.signin, userController.signinController);

router.post("/login", DTO.user.login, userController.loginController);

router.get("/users", userController.getAllUsersController);

router.get("/profiles", userController.getAllProfileUsersController);

router.get("/users/:id", userController.getUserController);

module.exports = router;
