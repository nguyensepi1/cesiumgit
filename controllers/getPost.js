// app.get('/post/:id', (req, res) => {
//     // --> thêm id vào url để request
//     BlogPost.findById(req.params.id, (err, detailPost) => {
//         res.render('post',{
//             detailPost
//         })
//     })
// })

const BlogPost = require('../app/models/BlogPost.js')
module.exports = (req, res) => {
    BlogPost.findById(req.params.id, function (error, detailPost) {
        res.render('post', {
            detailPost
        })
    })
}