import paymentModel from '../models/payment.model.js';
import Payment from '../entities/payment.entity.js';
import orderController from '../controllers/order.controller.js';
import errorMessage from '../helpers/error.message.helper.js';
import config from 'config';
import dateFormat from 'dateformat';
import querystring from 'qs';
import crypto from 'crypto'; 

function getAllPayment() {
    try {
      return paymentModel.getAllPayment();
    }
    catch (err) {
      return errorMessage(err);
    }
};
async function create(orderId, amount, ipAddr, bankCode) {
    try { 
      var tmnCode = config.get('vnp_TmnCode');
      var secretKey = config.get('vnp_HashSecret');
      var vnpUrl = config.get('vnp_Url');
      var returnUrl = config.get('vnp_ReturnUrl');

      var date = new Date();
      var createDate = dateFormat(date, 'yyyymmddHHmmss');
      var orderInfo = 'Thanh toan hoa don SagoBook';
      var orderType = 'billpayment';
      // if(locale === null || locale === ''){
      //   locale = 'vn';
      // }
      var locale = 'vn';
      var currCode = 'VND';
      var vnp_Params = {};
      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = tmnCode;
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params['vnp_Locale'] = locale;
      vnp_Params['vnp_CurrCode'] = currCode;
      vnp_Params['vnp_TxnRef'] = orderId;
      vnp_Params['vnp_OrderInfo'] = orderInfo;
      vnp_Params['vnp_OrderType'] = orderType;
      vnp_Params['vnp_Amount'] = amount * 100;
      vnp_Params['vnp_ReturnUrl'] = returnUrl;
      vnp_Params['vnp_IpAddr'] = ipAddr;
      vnp_Params['vnp_CreateDate'] = createDate;
      if(bankCode !== null && bankCode !== ''){
          vnp_Params['vnp_BankCode'] = bankCode;
      }
      
      vnp_Params = sortObject(vnp_Params);

      var signData = querystring.stringify(vnp_Params, { encode: false });    
      var hmac = crypto.createHmac("sha512", secretKey);    
      var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
      return vnpUrl;
    }
    catch (err) {
      return errorMessage(err);
    }
};
async function ipn(vnp_Params) {
  try { 
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var secretKey = config.get('vnp_HashSecret');
    var signData = querystring.stringify(vnp_Params, { encode: false });  
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    var orderId = vnp_Params['vnp_TxnRef'];
    var transactionId = vnp_Params['vnp_TransactionNo'];
    var amount = (vnp_Params['vnp_Amount'] / 100);
    var bankCode = vnp_Params['vnp_BankCode'];
    var orderInfo = vnp_Params['vnp_OrderInfo'];

    let newPayment = new Payment({
      "orderId": orderId,
      "transactionId": transactionId,
      "amount": amount,
      "bankCode": bankCode,
      "orderInfo": orderInfo,
    })
    if(secureHash === signed){      
      var status = {code: vnp_Params['vnp_TransactionStatus'],
                    message: 'Success'};
      newPayment.status = status;
      await paymentModel.save(newPayment);
      await orderController.updateOrder(orderId, {status: 2});
      return {RspCode: '00', Message: 'success'};
    }
    else {
      var status = {code: vnp_Params['vnp_TransactionStatus'],
                    message: 'Fail checksum'};
      newPayment.status = status;
      await paymentModel.save(newPayment);
      await orderController.updateOrder(orderId, {status: 5});
      return {RspCode: '97', Message: 'Fail checksum'};
    }
  }
  catch (err) {
    return errorMessage(err);
  }
};
function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj){
      if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
      }
    }
    str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
}
export default {
    getAllPayment,
    create,
    ipn,
};