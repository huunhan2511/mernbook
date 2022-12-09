import accountModel from '../models/account.model.js';
import errorMessage from '../helpers/error.message.helper.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config()

//Asset
const BCRYPT_SALT = 10;

function getAllAccount() {
    try {
      return accountModel.getAllAccount();
    }
    catch (err) {
      return errorMessage(err);
    }
};
async function changePassword(id, oldPassword, newPassword) {
  try {
    let account = await accountModel.getAccountByID(id);
    let isOldPassword = bcrypt.compareSync(oldPassword, account.password);
    let compare = bcrypt.compareSync(newPassword, account.password);
    if(!isOldPassword){
      return {Message : 'Mật khẩu cũ không đúng'};
    }
    if(!compare){
      account.password = newPassword;
      let err = account.validateSync();
      if (err) return errorMessage(err);
      newPassword = bcrypt.hashSync(newPassword,BCRYPT_SALT);     
      await accountModel.updatePasswordByID(id, newPassword);     
      return {Message : 'Thay đổi mật khẩu thành công'};
    }  
    return {Message : 'Mật khẩu mới không thể trùng với mật khẩu cũ'};
  }
  catch (err) {
    return errorMessage(err);
  }
};

export default {
    getAllAccount,
    changePassword,
};