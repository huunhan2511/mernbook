import mongoose from 'mongoose';
const publisherSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: [true, 'Tên nhà cung cấp không được bỏ trống'],
        match: [/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/, 'Tên không hợp lệ']
    },
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false }); //7hours = 25200000 milliseconds

const Publisher = mongoose.model('publisher', publisherSchema);
export default Publisher;