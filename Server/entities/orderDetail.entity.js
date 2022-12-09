import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order',
    },
    products: {
        type : Array,
        default : [{
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'product',
                },
                quantity: Number,
                price: Number 
            }]
    }
}, { timestamps: { currentTime: () => (Date.now() + 25200000) }, versionKey: false });

const orderDetail = mongoose.model('orderDetail', orderDetailSchema);
export default orderDetail;
