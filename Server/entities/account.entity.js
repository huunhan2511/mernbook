import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Tên tài khoản không được bỏ trống'],
        minLength: [8, 'Tên tài khoản tối thiểu 8 ký tự'],
        validate : {
            validator: async function(value) {
                const usernameCount = await mongoose.models.account.countDocuments({username: value });
                return !usernameCount;
            },
            message: 'Tên tài khoản [{VALUE}] đã tồn tại'
        }
    },
    password: {
        type: String,
        trim: true,     
        required: [true, 'Mật khẩu không được bỏ trống'],
        minlength: [8, 'Mật khẩu tối thiểu 8 ký tự'],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Email không được bỏ trống'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng'],
        validate : {
            validator: async function(value) {
                const emailCount = await mongoose.models.account.countDocuments({email: value });
                return !emailCount;
            },
            message: 'Email [{VALUE}] đã tồn tại'
        }
    },
}, { timestamps: {currentTime: () => (Date.now()+25200000)}, versionKey: false });

const Account = mongoose.model('account',accountSchema);
export default Account;