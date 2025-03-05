const jwt = require('jsonwebtoken');
// generate token
const generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY
  const options = {
    expiresIn: '1h',
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};
// validate
const validateUser = async function authenticateToken(req, res, next) {
//   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//     return req.headers.authorization.split(' ')[1];
// }

  const authHeader = req.headers['authorization'];
  if (authHeader == null) {
    return res.status(401).json({
      status: "fail",
      message: "You forgot the token!"
    })
  }

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Please login with token!"
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "fails",
        message: "Token is invalid plese check once again!"
      })
    }
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken, validateUser
};