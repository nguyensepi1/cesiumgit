const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Tạo model tương ứng với Collection, định nghĩa các thuộc tính
const BlogPostSchema = new Schema({
    name : String,
    content : String,
    username: String,   
    axis: String,
    datePosted: { /* can declare property type with an object like this becau
    se we need 'default' */
        type: Date,
        default: new Date()
    },
    file : String
})

// Sau khi định nghĩa xong các thuộc tính của Model cần export nó ra để các class khác có thể dùng
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
// --Truy cập dữ liệu thông qua hàm mongoose.model(..)
// --'BlogPost' là tên collection tương ứng (Đặt tên số ít nhưng trong mongoose sẽ tự động chuyển thành số nhiều)
module.exports = BlogPost

