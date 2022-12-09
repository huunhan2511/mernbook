import sgMail from "@sendgrid/mail";
import accountModel from "../models/account.model.js";
import informationModel from "../models/information.model.js";
import Account from "../entities/account.entity.js";
import Information from "../entities/information.entity.js";
import errorMessage from "../helpers/error.message.helper.js";
import jwtHelper from "../helpers/jwt.helper.js";
import passcode from "../utils/random.util.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
//Assets
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const BCRYPT_SALT = 10;
const sendgridKey = process.env.SENDGRID_KEY;

async function register(username, password, email) {
  try {
    let newAccount = new Account({
      username: username,
      password: password,
      email: email,
    });
    let newInformaton = new Information({
      _id: newAccount._id,
    });
    let err = newAccount.validateSync();
    if (err) return errorMessage(err);
    newAccount.password = bcrypt.hashSync(password, BCRYPT_SALT);
    let account = await accountModel.save(newAccount);
    await informationModel.save(newInformaton);
    return { Message: "Tạo tài khoản thành công" };
  } catch (err) {
    return errorMessage(err);
  }
}
async function login(username, password) {
  try {
    let account = await accountModel.getAccountByUsername(username);
    if (account) {
      let compare = bcrypt.compareSync(password, account.password);
      if (compare) {
        let token = { _id: account._doc._id };
        const accessToken = await jwtHelper.generateToken(
          token,
          ACCESS_TOKEN_SECRET,
          ACCESS_TOKEN_LIFE
        );
        // const refreshToken = await jwtHelper.generateToken(token, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
        // tokenList[refreshToken] = { accessToken, refreshToken };
        let res = { accessToken: accessToken };
        return res;
      }
    }
    return { Message: "Tài khoản hoặc mật khẩu không đúng" };
  } catch (err) {
    return errorMessage(err);
  }
}
async function resetPassword(email) {
  try {
    let account = await accountModel.getAccountByEmail(email);
    if (account) {
      sgMail.setApiKey(sendgridKey);
      let newPassword = passcode(6);
      var mail = {
        to: account.email,
        from: {
          name: "SAGOBO",
          email: "skyevans53@gmail.com",
        },
        subject: "Đặt lại mật khẩu",
        html:
          "<h1>Khôi phục mật khẩu</h1>" +
          "<p>Xin chào <b>" +
          account.username +
          "</b>,</p>" +
          "<p>Đã có yêu cầu khôi phục mật khẩu cho tài khoản của bạn liên kết với email " +
          account.email +
          ".</p>" +
          "<p>Mật khẩu của bạn đã được đặt lại mặc định là <mark><b>" +
          newPassword +
          "</b></mark>. Vui lòng thay mật khẩu mới để bảo vệ tài khoản.</p>" +
          "<p>Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng cho chúng tôi biết ngay lập tức bằng cách phản hồi email này.</p>" +
          "<p>Chân thành cảm ơn.</p>",
      };
      newPassword = bcrypt.hashSync(newPassword, BCRYPT_SALT);
      await accountModel.updatePasswordByID(account._id, newPassword);
      await sgMail.send(mail);
      return { Message: "Vui lòng kiểm tra Email để khôi phục mật khẩu" };
    }
    return { Error: "Email không tồn tại" };
  } catch (err) {
    return errorMessage(err);
  }
}

export default {
  register,
  login,
  resetPassword,
};
