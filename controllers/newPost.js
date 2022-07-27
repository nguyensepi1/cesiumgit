// app.get('/posts/new', (req, res) => {
//      res.render('create')
// })

module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("create");
    }
    res.redirect('/auth/login')
}

// --> Kiểm tra xem session có chứa user id hay không
// --> Nếu không => Chưa đăng nhập => Tiến hành direct sang màn hình login 