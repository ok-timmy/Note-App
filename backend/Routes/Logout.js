const router = require("express").Router();
const { handleLogout } = require("../Controller/LogoutController");

//GET REFRESH TOKEN
router.get("/", handleLogout);



module.exports = router;
