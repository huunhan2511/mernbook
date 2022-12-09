import mongoose from 'mongoose';
const authorSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: [true, 'Tên tác giả không được bỏ trống'],
        match: [/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/, 'Tên không hợp lệ']
    },
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false }); //7hours = 25200000 milliseconds

const Author = mongoose.model('author', authorSchema);
export default Author;