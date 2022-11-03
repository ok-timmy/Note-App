const router = require("express").Router();
const { handleRefreshToken } = require("../Controller/RefreshTokenController");

//GET REFRESH TOKEN
router.get("/", handleRefreshToken);



module.exports = router;
