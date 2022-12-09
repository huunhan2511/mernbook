import adminModel from '../models/admin.model.js';
import Admin from '../entities/admin.entity.js';
import errorMessage from '../helpers/error.message.helper.js';
import jwtHelper from '../helpers/jwt.helper.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config()
//Assets
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const BCRYPT_SALT = 10;
// let tokenList = {};

function getAllAdmin() {
  try {
    return adminModel.getAllAdmin();
  }
  catch (err) {
    return errorMessage(err);
  }
};
async function register(username, password) {
  try {
    let newAdmin = new Admin({
      "username": username,
      "password": password,
    });
    let err = newAdmin.validateSync();
    if (err) return errorMessage(err);
    newAdmin.password = bcrypt.hashSync(password, BCRYPT_SALT);
    await adminModel.save(newAdmin);
    return { Message: 'Tạo tài khoản thành công' };
  }
  catch (err) {
    return errorMessage(err);
  }
};
async function login(username, password) {
  try {
    let admin = await adminModel.getAdminByUsername(username);
    if (admin) {
      let compare = bcrypt.compareSync(password, admin.password);
      if (compare){
      let token = { _id: admin._doc._id };
      const accessToken = await jwtHelper.generateToken(token, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
      // const refreshToken = await jwtHelper.generateToken(token, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
      // tokenList[refreshToken] = { accessToken, refreshToken };
      let res = { 'accessToken': accessToken };
      return res;
      }
    }
    return { Message: 'Tài khoản hoặc mật khẩu không đúng' }
  }
  catch (err) {
    return errorMessage(err);
  }
};

export default {
  register,
  login,
  getAllAdmin,
};