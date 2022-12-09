import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    account : {
        type: Schema.Types.ObjectId,
        ref: 'account'
    },
    customer : {
        type: String,
        required: [true, 'Tên không được bỏ trống']
    },
    phone : {
        type: String,
        match: [/^\d{10}$/ , 'Số điện thoại không hợp lệ'],
        required: [true, 'Số điện thoại không được bỏ trống']
    },
    address : {
        type: String,
        required: [true, 'Địa chỉ không được bỏ trống']
    },
    totalPrice : {
        type: Number,
        required: [true, 'Tổng tiền không được bỏ trống']
    },
    shipping : {
        type: Number,
        required: [true, 'Phí giao hàng không được bỏ trống']
    },
    voucher : {
        type: Schema.Types.ObjectId,
        ref: 'voucher'
    },
    grandTotal : {
        type: Number,
        required: [true, 'Tổng thanh toán không được bỏ trống']
    },
    paymentMethod : {
        type: String,
        enum: ['COD', 'Online'],
    },
    status :{
        type: Number,
        ref: 'status'
    },
    cancelReason: {
        type: String,
    },
    note :{
        type: String,
    },
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false }); //7hours = 25200000 milliseconds

const Order = mongoose.model('order', orderSchema);
export default Order;