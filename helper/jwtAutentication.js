const util = require("util");
const jwt = require("jsonwebtoken");

const genratetoken = util.promisify(jwt.sign);
const verfiyToken = util.promisify(jwt.verify);
module.exports.genratetoken = genratetoken;
module.exports.verfiyToken = verfiyToken;
