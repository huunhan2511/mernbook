import voucherModel from '../models/voucher.model.js';
import Voucher from '../entities/voucher.entity.js';
import errorMessage from '../helpers/error.message.helper.js';

function getAllVoucher() {
    try {
      return voucherModel.getAllVoucher();
    }
    catch (err) {
      return errorMessage(err);
    }
};

function getVoucherByCode(code) {
    try {
      return voucherModel.getVoucherByCode(code);
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function create(code, discount, quantity, description) {
    try {
      let newVoucher = new Voucher({
          code : code,
          discount : discount,
          quantity : quantity,
          description : description
      });
      let err = newVoucher.validateSync();
      if (err) return errorMessage(err);
      let res = await voucherModel.save(newVoucher);
      return {Message : 'Tạo voucher thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function apply(accountId, voucherId) {
    try {
        let voucher = await voucherModel.getVoucherByID(voucherId);
        voucher.quantity--;
        await voucherModel.updateQuantityByID(voucherId,voucher.quantity);
        await voucherModel.updateAppliedIDByID(voucherId,accountId);
        return {Message : 'Cập nhật voucher thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};
async function update(id, code, discount, quantity, description) {
  try {
      await voucherModel.update(id, code, discount, quantity, description);
      return {Message : 'Cập nhật voucher thành công'};
  }
  catch (err) {
    return errorMessage(err);
  }
};
async function isAvailable(code, accountId) {
  try {
    let voucher = await voucherModel.getVoucherByCode(code);
    if(voucher){
      let quantity = voucher.quantity;
      let isApplied = await voucherModel.isAppliedCodeByID(code,accountId);
      if (isApplied){
        return {Message : 'Voucher đã qua sử dụng', isAvailable : false };
      }
      if (quantity<=0){
        return {Message : 'Voucher đã hết lượt sử dụng', isAvailable : false};
      }
      return {
        id : voucher._id,
        Message : 'Voucher có thể áp dụng',
        Discount : voucher.discount,
        isAvailable : true,

      };
    }  
    return {Message : 'Voucher không tồn tại', isAvailable : false};
  }
  catch (err) {
    return errorMessage(err);
  }
};

export default {
    getAllVoucher,
    getVoucherByCode,
    create,
    update,
    isAvailable,
    apply
};