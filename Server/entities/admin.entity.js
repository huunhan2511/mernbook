import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Tên tài khoản không được bỏ trống'],
        minLength: [5, 'Tên tài khoản tối thiểu 8 ký tự'],
        validate : {
            validator: async function(value) {
                const usernameCount = await mongoose.models.admin.countDocuments({username: value });
                return !usernameCount;
            },
            message: 'Tên tài khoản [{VALUE}] đã tồn tại'
        }
    },
    password: {
        type: String,
        trim: true,     
        required: [true, 'Mật khẩu không được bỏ trống'],
        minlength: [5, 'Mật khẩu tối thiểu 8 ký tự'],
    },
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false });

const Admin = mongoose.model('admin',adminSchema);
export default Admin;