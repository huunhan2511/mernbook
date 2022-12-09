import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên thể loại không được bỏ trống'] 
    }
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false  })

const Category = mongoose.model('category', categorySchema)
export default Category