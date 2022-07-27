// app.post('/posts/store', (req, res) => {
//     // console.log(req.body)
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname, 'public/upload', image.name), (err) => {
//         // --model creates a new doc with browser data
//         // BlogPost.create(req.body, (err, blogpost) => {
//         BlogPost.create({
//             ...req.body,
//             image : '/upload/' + image.name
//         }, (err) => {
//             // --Lưu dữ liệu bài Post vào Database
//             res.redirect('/')
//         }) 
//     }) 
// })



const BlogPost = require('../app/models/BlogPost.js')
const path = require('path')
module.exports = (req, res) => {
 let file = req.files.file;
 file.mv(path.resolve(__dirname, '..', './public/upload', file.name), (error) => {
    BlogPost.create({
        ...req.body,
        file: '/upload/' + file.name
    }, function (err) {
        res.redirect('/posts/new')
        })
    })
}
