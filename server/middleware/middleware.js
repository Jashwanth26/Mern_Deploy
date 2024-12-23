// middleware/middleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    let token = req.header('x-token');
    if (!token) {
      return res.status(400).send('Token Not found');
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send('Authentication Error');
  }
};
