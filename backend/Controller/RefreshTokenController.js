const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

//Login User
exports.handleRefreshToken = (req, res) => {
    console.log(req.cookies.jwt);
  const cookies = req.cookies;
  if (!cookies.jwt) {
    console.log("No cookie found")
    res.sendStatus(401);
  } else {
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = User.findOne({ email: req.body.email });
    if (!foundUser) {
      res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.email !== req.body.email) res.sendStatus(403);

        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "120s" }
        );

        res.json({ accessToken });
      }
    );
  }
};

