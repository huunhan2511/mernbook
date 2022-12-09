import mongoose from 'mongoose';
const statusSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: [true, 'ID không được bỏ trống'],
    },
    status: {
        type: String,  
        required: [true, 'Tên trạng thái không được bỏ trống'],
        match: [/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/, 'Trạng thái không hợp lệ']
    },
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false }); //7hours = 25200000 milliseconds

const Status = mongoose.model('status', statusSchema);
export default Status;