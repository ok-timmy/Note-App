const User = require("../Models/User");

//Logout User
exports.handleLogout = async(req, res) => {
  //On Client side, delete the access token too.

  const cookies = req.cookies;
  if (!cookies.jwt) {
    console.log("No cookie found");
    res.sendStatus(204); //No content to send back and that is fine
  } else {
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt

    const foundUser =await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      // Cookie is found but does not match the user details.
      res.clearCookie("jwt", { httpOnly: true, sameSite: none, secure: true });
      res.sendStatus(204); // All cookies is cleared
    }

    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  }
};
