const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { genratetoken } = require("../helper/jwtAutentication");
const fileName = path.join(__dirname, "..", "data", "user.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));
const User = require("../module/usermodule");

const signUpUser = (req, res, next) => {
  console.log(req.body);
  let newUser = new User(req.body.email, req.body.password);
  users.push(newUser);
  fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      res.send("Internal Error");
      return err;
    }
    res.status(200).json({
      status: "done",
      message: "new user created",
    });
  });
};

const loginUser = async (req, res, next) => {
  console.log(req.currentUser);
  try {
    let result = await bcrypt.compare(
      req.body.password,
      req.currentUser.password
    );

    let jwttoken = await genratetoken(
      { email: req.currentUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log(jwttoken);
    res.cookie("jwt", jwttoken);
    res.status(200).json({
      status: "Successful",
      data: [
        {
          jwt: jwttoken,
        },
      ],
    });

    // res.send("login Succesfully");
    if (!result) {
      return res.send("Wrong Password");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;
