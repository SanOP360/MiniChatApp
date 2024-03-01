// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const loginRoutes = require("./routes/login");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/login", loginRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
