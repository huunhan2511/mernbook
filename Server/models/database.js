import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

function connect(){
    const url = process.env.DB_URL;   
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('[Kết nối cơ sở dữ liệu thành công]');
    })
    .catch(err => {
        console.log('[Kết nối cơ sở dữ liệu thất bại]');
    });
}
export default connect;