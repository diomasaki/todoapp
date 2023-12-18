module.exports = {
  STATUS: (res, code, status, message, data) =>
    res.status(code).json({
      status: status,
      message: message,
      data: data,
    }),
};
