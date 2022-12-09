import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phảm không được bỏ trống'],
        minlength: [1, 'Tên sản phẩm tối thiểu 1 ký tự'],
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Giá sản phẩm không được bỏ trống'],
        min: [1, 'Giá sản phẩm tối thiểu là 1'],
    },
    category: {
        type: String,
        required: [true, 'Thể loại không được bỏ trống'],
        ref: 'category',
    },
    author: {
        type: String,
        required: [true, 'Tác giả không được bỏ trống'],
        ref: 'author',
    },
    publisher: {
        type: String,
        required: [true, 'Nhà cung cấp không được bỏ trống'],
        ref: 'publisher',
    },
    printLength:{
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Số lượng sản phẩm tối thiểu là 0'],
    },
    hot: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: ''
    },
    image: [{
        type: String,
    }]
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false  })

const product = mongoose.model('product', productSchema)
export default product
