const bcrypt = require('bcrypt')
const User = require('../app/models/User')
module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
    // --> findOne : query vào DB xem user có tồn tại không
        if (user) { // Nếu user đó tồn tại
            bcrypt.compare(password, user.password, (error, same) => {
            // --> Mã hóa password
            // --> Do thông tin nhạy cảm nên thay vì dùng ===
            // --> Thì dùng api .compare(...) của bcrypt
                if (same) { // if passwords match
                    // store user session, will talk about it later
                    req.session.userId = user._id
                    req.session.userName = user.username
                    // --> Chỉ định user_id cho mỗi session
                    // --> Ex-session module lưu thông tin này xuống cookie trình duyệt của người dùng
                    // --> Mỗi khi ng dùng gửi yêu cầu thì trình duyệt gửi cookie lại cho sv và kèm authenticated id
                    res.redirect('/posts/new')
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            res.redirect('/auth/login')
        }
    })
}