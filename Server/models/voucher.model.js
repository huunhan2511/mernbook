import Voucher from '../entities/voucher.entity.js';

function getAllVoucher() {
    return new Promise((res, rej) => {
        Voucher.find({})
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
function getVoucherByCode(code) {
    let query = {code : code}
    return new Promise((res, rej) => {
        Voucher.findOne(query)
                .exec((err, data) => {
                    if (err) rej(err)
                    if (data) res(data)
                    res(null);
            })
    })
}
function getVoucherByID(id) {
    let query = {_id : id}
    return new Promise((res, rej) => {
        Voucher.findOne(query)
                .exec((err, data) => {
                    if (err) rej(err)
                    if (data) res(data)
                    res(null);
            })
    })
}
function save(newVoucher) {      
    return new Promise((res, rej) => {
        newVoucher.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}
function updateQuantityByID(voucherId, quantity) {    
    let condition = {_id : voucherId};
    let update = {quantity : quantity};
    return new Promise((res, rej) => {
        Voucher.updateOne(condition,update)
                .exec((err, voucher) => {
                    if (err) rej(err);
                    if (voucher) res(voucher);
                })
    })
}
function update(id, code, discount, quantity, description) {    
    let condition = {_id : id};
    let update = {code : code, quantity : quantity, discount : discount, description : description};
    return new Promise((res, rej) => {
        Voucher.updateOne(condition, update)
                .exec((err, voucher) => {
                    if (err) rej(err);
                    if (voucher) res(voucher);
                })
    })
}
function updateAppliedIDByID(voucherId,accountId){
    let condition = {_id : voucherId};
    let update = {$push : { account : accountId}};
    return new Promise((res, rej) => {
        Voucher.updateOne(condition, update)
                .exec((err, data) => {
                    if (err) rej(err);
                    if (data) res(true);
                    res(false);
            })
    })
}
function isAppliedCodeByID(code, _id){
    let condition = {code : code, account : _id};
    return new Promise((res, rej) => {
        Voucher.findOne(condition)
                .exec((err, data) => {
                    if (err) rej(err);
                    if (data) res(true);
                    res(false);
            })
    })
}
export default {
    // CRUD
    getAllVoucher,
    getVoucherByCode,
    getVoucherByID,
    save,
    update,
    // Applying Voucher
    isAppliedCodeByID, 
    updateQuantityByID,
    updateAppliedIDByID,     
}