const router = require("express").Router();
const { createUser, loginUser } = require("../Controller/UserController");
const verifyJWT = require("../Middleware/verifyJWT");

//REGISTER
router.post("/register", createUser);

//LOGIN
router.post("/login", loginUser);

module.exports = router;
