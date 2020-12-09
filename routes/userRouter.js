const express = require("express");
const { signUpUser, loginUser } = require("../controller/usercontroller");
const {
  checkRequestBody,
  isEmailValid,
  checkConFromPassword,
  emailIsUniqe,
  createPasswordHash,
  isUserRegister,
} = require("../middleWare/usersMiddleWare");

const router = express.Router();

router
  .route("/signup")
  .post(
    checkRequestBody,
    isEmailValid,
    checkConFromPassword,
    emailIsUniqe,
    createPasswordHash,
    signUpUser
  );
router.route("/login").post(checkRequestBody, isUserRegister, loginUser);
router.route("/logout").get();

module.exports = router;
