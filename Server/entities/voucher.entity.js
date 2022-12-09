import mongoose from "mongoose";
const voucherSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Mã voucher không được bỏ trống']
    },
    discount: {
        type: Number,  
        min: [1, 'Giảm giá tối thiểu là 1'],
        required: [true, 'Giảm giá không được bỏ trống']
    },
    quantity: {
        type: Number,  
        min: [0, 'Số lượng không hợp lệ'],
        required: [true, 'Số lượng không được bỏ trống']
    },
    description: {
        type: String,
    },
    account : {
        type: Array,
        default: []
    }
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false }); //7hours = 25200000 milliseconds

const Voucher = mongoose.model('voucher', voucherSchema);
export default Voucher;