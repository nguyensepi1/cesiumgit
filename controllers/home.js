// app.get('/', (req, res) => {
//     BlogPost.find({}, (err, posts) => {
//         console.log(posts)
//         // --> Truyền dữ liệu từ database sang file giao diện được viết bởi template engine
//         res.render('index', {
//             blogposts : posts
//             // --> dữ liệu trả về sẽ được gán cho biến blogposts.
//             // --> Đây là biến sẽ được sử dụng trong file index.ejs
//         })
//     })
// })


const BlogPost = require('../app/models/BlogPost')
module.exports = (req, res) => {
    BlogPost.find({},  (error, posts) => {
        // console.log(req.session)
        // console.log(posts);
        res.render('index', {
            blogposts: posts
        })
    })
}