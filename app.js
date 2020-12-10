const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const userTask = require("./routes/userRouter");
const { protcetRoute } = require("./middleWare/protectroute");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/users", userTask);
app.get("/dashboard", protcetRoute, (req, res) => {
  // console.log(req.headers.authorization);
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`On Port ${process.env.PORT}`);
});
