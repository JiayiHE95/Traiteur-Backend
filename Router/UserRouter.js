const express = require('express');
const router = express.Router();

const userController = require("../Controller/UserController");

// GET all users
router.get("/all", userController.getUsers);
router.get("/isLogged", userController.verifyJWT);
// GET user by ID
router.get("/:id/profil", userController.getUserById);

// GET user by ID
router.post("/connexion", userController.connexion);

// POST create new user
router.post("/create-user", userController.createUser);

module.exports = router;