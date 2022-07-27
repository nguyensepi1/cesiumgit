const User = require('../../app/models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (error || !user)
            return res.redirect('/')
            next()
    })
}

// --> User.findById(req.session.userId) : Query vào DB để tìm userId 
// --> Nếu tồn tại thì gọi hàm next()
// --> Ngược lại thì direct về trang chủ