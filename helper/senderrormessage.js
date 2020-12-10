const sendErrorMessage = (error, req, res) => {
  res.status(error.StatusCode).json({
    Status: error.Status,
    meassage: error.message,
  });
};

module.exports.sendErrorMessage = sendErrorMessage;
