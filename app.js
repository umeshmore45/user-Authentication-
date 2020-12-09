const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const userTask = require("./routes/userRouter");

app.use(express.json());
app.use("/users", userTask);

app.listen(process.env.PORT, () => {
  console.log(`On Port ${process.env.PORT}`);
});
