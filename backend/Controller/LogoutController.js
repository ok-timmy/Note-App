const User = require("../Models/User");

//Logout User
exports.handleLogout = (req, res) => {
  //On Client side, delete the access token too.

  const cookies = req.cookies;
  if (!cookies.jwt) {
    console.log("No cookie found");
    res.sendStatus(204); //No content to send back and that is fine
  } else {
    console.log(cookies.jwt);

    const foundUser = User.findOne({ email: req.body.email });
    if (!foundUser) {
      // Cookie is found but does not match the user details.
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204); // All cookies is cleared
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  }
};
