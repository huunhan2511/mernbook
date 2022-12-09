import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({   
    product : {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    account : {
        type: Schema.Types.ObjectId,
        ref: 'account'
    },
    context : {
        type: String,
        required: [true, 'Nội dung bình luận không được bỏ trống']
    }
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false }); //7hours = 25200000 milliseconds

const Comment = mongoose.model('comment', commentSchema);
export default Comment;