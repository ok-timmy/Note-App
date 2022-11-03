const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie-parser");
const User = require("../Models/User");

//Create User
exports.createUser = async (req, res) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(newUser);
    const user = await newUser.save();
    res.status(200).json(user);
    console.log("User Created Successfully!");
  } catch (error) {
    res.status(500).json(error.code);
    console.log(error);
    console.log("User Not Created!!");
  }
};

//Login User
exports.loginUser = async (req, res) => {
  // console.log(req.body.email)
  try {
    const user = await User.findOne({ email: req.body.email });

    // console.log(user);
    if (user) {
      console.log(user.email, req.body.password);

      const validUser = await bcrypt.compare(req.body.password, user.password);
      console.log(validUser);
      if (validUser) {
        // console.log(user);
        console.log("User is found");

        const accessToken = jwt.sign(
          { username: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "120s" }
        );

        const refreshToken = jwt.sign(
          { userEmail: user.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        console.log(accessToken);
        console.log(refreshToken);
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 24 * 60 * 60,
          sameSite: "None",
          secure: true,
        });
        console.log("cookie created!!");

        const { email, name } = user;

        res.status(200).json({ email, name, accessToken });
      } else res.status(400).json("Wrong Password");
    } else res.status(400).json("User Does Not exist");
  } catch (error) {
    res.send(error);
  }
};
