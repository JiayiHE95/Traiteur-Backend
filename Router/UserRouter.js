const express = require('express');
const router = express.Router();

const userController = require("../Controller/UserController");

router.get("/all", userController.getUsers);
router.get("/isLogged", userController.verifyJWT);
router.get("/get-user-by-mail/:mail", userController.getUserByMail);
router.get("/get-user-by-id/:id", userController.getUserById);
router.get("/get-user-by-pwtoken/:token", userController.getUserByPWToken);
router.post("/check-password", userController.verifyPassword);
router.post("/password-forgot", userController.passwordForgot);
router.post("/password-reset", userController.passwordReset);
router.get("/check-pw-token", userController.verifyPWToken);
router.get("/:id/profil", userController.getUserById);
router.post("/connexion", userController.connexion);
router.post("/create-user", userController.createUser)
router.post("/update-user", userController.updateUser);

module.exports = router;