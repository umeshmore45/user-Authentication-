const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "..", "data", "user.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const checkRequestBody = (req, res, next) => {
  let validationArray;
  switch (req.url) {
    case "/signup":
      validationArray = ["email", "password", "confirmPassword"];
      break;

    case "/login":
      validationArray = ["email", "password"];
      break;
  }
  //   let validationArray = ["email", "password", "confirmPassword"];

  let reslut = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().lenght;
  });

  if (reslut) {
    return res.send("Invalid Body");
  }
  next();
};

const isEmailValid = (req, res, next) => {
  next();
};

const checkConFromPassword = (req, res, next) => {
  console.log(req.body.confirmPassword);
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Don't Match");
  }
  next();
};

const emailIsUniqe = (req, res, next) => {
  let findUser = users.find((user) => {
    return user.email == req.body.email;
  });

  if (findUser) {
    return res.send("Already A User");
  }
  next();
};

const createPasswordHash = async (req, res, next) => {
  let salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  next();
};

const isUserRegister = (req, res, next) => {
  let findUser = users.find((user) => {
    return user.email == req.body.email;
  });

  if (!findUser) {
    return res.send("Not Valid User");
  }
  req.currentUser = { ...findUser };
  next();
};

module.exports.checkRequestBody = checkRequestBody;
module.exports.isEmailValid = isEmailValid;
module.exports.checkConFromPassword = checkConFromPassword;
module.exports.emailIsUniqe = emailIsUniqe;
module.exports.createPasswordHash = createPasswordHash;
module.exports.isUserRegister = isUserRegister;
