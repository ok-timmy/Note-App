const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const AuthRoute = require("./Routes/Auth");
const NoteRoute = require("./Routes/Notes");
const RefreshRoute = require("./Routes/Refresh");
const LogoutRoute = require("./Routes/Logout");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const verifyJWT = require("./Middleware/verifyJWT");

dotenv.config();

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("Server is running!");
});

app.use("/api/auth", AuthRoute);
app.use("/logout", LogoutRoute);
app.use(verifyJWT);
app.use("/refresh", RefreshRoute);

app.use("/api", NoteRoute);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to DB successfully!!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT || 5000, () => {
  console.log(`Note app listening on port ${PORT || 5000}`);
});
