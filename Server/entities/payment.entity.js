import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const paymentSchema = new mongoose.Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'order',
    },
    transactionId: {
        type: String
    },
    amount: {
        type: Number
    },
    bankCode: {
        type: String
    },
    orderInfo: {
        type: String
    },
    status: {
        code: { type: String },
        message: { type: String}
    }
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false }); //7hours = 25200000 milliseconds

const Payment = mongoose.model('payment', paymentSchema);
export default Payment;