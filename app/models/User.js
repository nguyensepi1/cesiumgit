const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const User = require('../models/User.js')
const bcrypt = require('bcrypt')

// module.exports = (req, res) => {
//     User.create(req.body, (error, user) => {
//         res.redirect('/')
//     })
// }

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        //--> Bắt buộc phải có dữ liệu không được null
        unique : true
        // --> Duy nhất, không được trùng lặp
    },
    password : {
        type : String,
        required : true
    }
});

UserSchema.pre('save', function (next) {
    // --> Hàm pre để thông báo cho Mongoose biết là sẽ cần thực hiện hàm trong tham số thứ 2 trước khi lưu vào Users Collection
    // --> Cho phép thay đổi dữ liệu trước khi lưu vào DB 
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        // --> Hàm bcrypt.hash(...) để mã hóa cần 2 giá trị đầu vào.
        user.password = hash
        // --> 1 : mật khẩu dạng thô, 2 : số lần mã hóa (cảng lớn thì càng lâu nhưng an toàn hơn)
        next()
    })
});


// Export model
const User = mongoose.model('User', UserSchema)
module.exports = User

