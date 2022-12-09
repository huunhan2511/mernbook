import jwtHelper from '../helpers/jwt.helper.js';
import adminModel from '../models/admin.model.js';
import dotenv from 'dotenv';
dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function isAuth(req, res, next) {
  let authorization = req.headers.authorization;
  if (authorization) {
    try {
      const tokenFromClient = req.headers.authorization.split(" ")[1];
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret, { complete: true });
      req.jwtDecoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        Message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      Message: 'No token provided.',
    });
  }
}
async function isAdmin(req, res, next) {
  let authorization = req.headers.authorization;
  if (authorization) {
    try {
      const tokenFromClient = req.headers.authorization.split(" ")[1];
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret, { complete: true });
      req.jwtDecoded = decoded;
      let isAdmin = await adminModel.getAdminByID(decoded._id);
      if (isAdmin) {
        next();
      }
      else {
        return res.status(403).json({
          Message: 'Access Denied',
        });
      }
    } catch (error) {
      return res.status(401).json({
        Message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(401).send({
      Message: 'No token provided.',
    });
  }
}
export default { isAuth, isAdmin };