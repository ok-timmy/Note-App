const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

//Refresh LoggedIn User
exports.handleRefreshToken = async(req, res) => {
    console.log(req.cookies);
  const cookies = req.cookies;
  console.log("Cookies", cookies);
  if (!cookies.jwt) {
    console.log("No cookies found")
    res.sendStatus(401);
  } else {
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
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

        res.json({ accessToken, });
      }
    );
  }
};

