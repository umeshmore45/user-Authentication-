const path = require("path");
const fs = require("fs");
const fileName = path.join(__dirname, "..", "data", "user.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const { verfiyToken } = require("../helper/jwtAutentication");
const { sendErrorMessage } = require("../helper/senderrormessage");
const { AppError } = require("../helper/classError");

// const protcetRoute = async (req, res, next) => {
//   console.log(req.headers.authorization);

//   if (!req.headers.authorization) {
//     return sendErrorMessage(
//       new AppError(401, "Unsuccessful", "Please login or signup"),
//       req,
//       res
//     );
//   }

//   let jwtToken = req.headers.authorization.split(" ")[1];
//   try {
//     let decode = await verfiyToken(jwtToken, process.env.JWT_SECRET);
//     console.log(decode);
//     let currentUser = users.find((user) => {
//       return user.email == decode.email;
//     });

//     if (!currentUser) {
//       return res.send("not valid User");
//     }
//     req.currentUser = currentUser;
//     next();
//   } catch (err) {
//     return err;
//   }
// };

const protcetRoute = async (req, res, next) => {
  //   console.log("headers in req body", req.headers.authorization);
  // extract token
  if (!req.headers.authorization) {
    return sendErrorMessage(
      new AppError(401, "Unsuccessful", "Please login or signup"),
      req,
      res
    );
  }
  // if headers are there
  let jwtToken = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = await verfiyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "Invalid Token"),
      req,
      res
    );
  }
  let { email: currentUser } = users.find((user) => {
    return user.email == decoded.email;
  });
  if (!currentUser) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "User not registered"),
      req,
      res
    );
  }
  // check verification
  req.currentUser = currentUser;
  // give access
  next();
};

module.exports.protcetRoute = protcetRoute;
