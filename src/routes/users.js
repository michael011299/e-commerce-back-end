const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController.js");

router.get("/", usersController.getUsers);
router.get("/:username", usersController.getUserByID);
router.post("/newuser", usersController.createUser);
router.patch("/updateuser", usersController.updateUser);

module.exports = router;
