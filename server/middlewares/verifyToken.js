import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');
dotenv.config();

/* eslint consistent-return: off */
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization');
  try {
    if (!token) {
      return res.status(401).json('Access Denied');
    }
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    res.send(decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    return error;
  }
};
export default verifyToken;
