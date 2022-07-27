const User = require('../app/models/User')
module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            return res.redirect('/auth/register')
        }
        // console.log(error)
        res.redirect('/auth/login')
    })
}