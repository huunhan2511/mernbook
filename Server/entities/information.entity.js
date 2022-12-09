import mongoose from "mongoose";
const infomationSchema = new mongoose.Schema({
    _id :{
        type: String,
    },
    fullname: {
        type: String,
        match: [/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/, 'Tên không hợp lệ'],
    },
    phone: {
        type: String,
        trim: true,     
        match: [/^\d{10}$/ , 'Số điện thoại không hợp lệ'],
    },
    address: {
        type: String,
    },
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false });

const Information = mongoose.model('informations', infomationSchema);
export default Information;