module.exports = (req, res) => {
    req.session.destroy(() => {
        // --> Xóa tất cả dữ liệu liên quan session, kể cả  session user id
        res.redirect('/')
        // --> Sau khi xóa xong thì redirect về trang chủ.
    })
}