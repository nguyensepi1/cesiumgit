// ------------- IMPORT MODULES, FILES------------------------------

const express = require('express')

// const path = require('path')
// --> Do chuyển sang mô hình MVC nên đã có này trong file controllers

const ejs = require('ejs')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

// const BlogPost = require('./app/models/BlogPost.js')
// --> Do chuyển sang mô hình MVC nên đã có này trong file controllers

const fileUpload = require('express-fileupload')

const authMiddleware = require('./controllers/middleware/authMiddleware')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

const validateMiddleware = require('./controllers/middleware/validationMiddleware');

const newUserController = require('./controllers/newUser')

const storeUserController = require('./controllers/storeUser')

const loginController = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')

const expressSession = require('express-session')

const redirectIfAuthenticatedMiddleware = require('./controllers/middleware/redirectIfAuthenticatedMiddleware')

const logoutController = require('./controllers/logout')

// ----------------TẠO BIẾN, KẾT NỐI-----------------------------------
const port = 27107

const app = express()

// Đămg ký thư mục public
app.use(express.static('public'))

app.listen(port, (req, res) =>
    console.log(`App listening at http://localhost:${port}`))

// Template engine
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/database_web', {useNewUrlParser : true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(fileUpload())

// app.use('/posts/new',validateMiddleWare)
// (đã viết ở dưới)

app.use(expressSession({
    secret: 'keyboard cat',
    // --> secret : một string để ex-session đăng ký và mã hóa các session ID được gửi bởi trình duyệt.
    // --> Có thể thay đổi thoải mái
    resave: true,
    saveUninitialized: true
}))

global.loggedIn = null
// --> Khai báo biến loggedIn kiểu global : truy cập biến này trong các file EJS
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})
// --> Với toán tử "*", áp dụng cho mọi req và sẽ gán UserID cho biến loggedIn

// ----------------- TẠO ROUTE --------------------------------

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/index.html'))
// })

// app.get('/', (req, res) => {
//     // response.sendFile(path.resolve(__dirname, 'pages/index.html'))})
//     res.render('index')
// })

// ---> Đổi thành hiển thị toàn bộ post ngoài trang chủ 

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

// ---> Chuyển sang mô hình MVC đổi thành

app.get('/', homeController)

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
     res.render('about')
    })

app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
     res.render('contact')
})


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// app.get('/post', (req, res) => {
//     //res.sendFile(path.resolve(__dirname,'pages/post.html'))
//      res.render('post')
// })

// ---> Đổi thành ... để hiển thị nội dung của bài post

// app.get('/post/:id', (req, res) => {
//     // --> thêm id vào url để request
//     BlogPost.findById(req.params.id, (err, detailPost) => {
//         res.render('post',{
//             detailPost
//         })
//     })
// })

// ---> Chuyển sang mô hình MVC đổi thành

app.get('/post/:id', getPostController)

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// app.get('/posts/new', (req, res) => {
//      res.render('create')
// })

// ---> Chuyển sang mô hình MVC thay thành

// const newPostController = require('./controllers/newPost')
app.get('/posts/new',newPostController)


// app.get('/auth/register', newUserController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

// app.get('/auth/login', loginController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.get('/posts/new', authMiddleware, newPostController)

app.get('/auth/logout', logoutController)

// ------------------------ XỬ LÝ POST REQUEST -------------------------------

// Lấy dữ liệu từ trình duyệt gửi lên thông qua trường body của request
// Cần cài thêm module body-parser do node.js chưa hỗ trợ
// Module này sẽ parser những dữ liệu trong POST req rồi đưa vào trường body để có thể lấy ra một cách dễ dàng  
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

// ---> Chuyển sang mô hình MVC thay thành

app.post('/posts/store', storePostController)

// app.post('/users/register', storeUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

// app.post('/users/login', loginUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.post('/posts/store', authMiddleware, storePostController)
// ------------------------- POST -------------------------------------------
// Hiển thị danh sách các bài Post
// Sửa trong file index.ejs, tạo vòng lặp lấy dữ liệu 

// Hiển thị nội dung một post
// Chỉnh sửa lại route của /post/:id 
// Chỉnh sửa lại file post.ejs

// Thêm thông tin tác giả và ngày đăng bài
// Mở BlogPost.js thêm username và datePosted
// Thay đổi trong index.ejs
// Thay đổi trong post.ejs


// Tạo tính năng upload ảnh
// Sử dụng module express-fileupload
// Trong create.ejs thêm enctype="multipart/form-data" trong thẻ <form>
// --> Thuộc tính đó để báo cho trình duyệt biết là form có chứa dữ liệu multimedia
// --> Trình duyệt sẽ tự động mã hóa trước khi gửi lên server
// Mở BlogPost.js thêm image
// Đổi lại phần xử lý route của /posts/store
// Hiển thị ảnh ở mỗi bài post
// post.ejs : thay url ở thẻ <header? thành <%= detailPost.image %>


// Tạo một Validation Middleware
// Các mục điền không được để trống
// Đoạn này phải nằm dưới đoạn app.use(fileUpload) vì cần sử dụng thuộc tính files của đối tượng req
// const validateMiddleWare = (req, res, next) => {
//     if (req.files == null || req.body.title == null || req.body.title == null) {
//         return res.redirect('/posts/new')
//     }
//     next()
// }
// Apply hàm Middleware thông qua URL để gọi validateMiddleWare mỗi khi tạo bài post mới 
// app.use('/posts/new',validateMiddleWare)

// Chuyển sang mô hình MVC đổi thành
app.use('/posts/new', validateMiddleware)

app.use((req, res) => res.render('notfound'))


// ----------------------- MÔ HÌNH MVC ---------------------------
// Có 3 lớp xử lý : Model - Vỉew - Controller

// * Model : là nơi chứa những nghiệp vụ tương tác với dữ liệu hoặc hệ quản trị cơ 
// sở dữ liệu (mysql, MongoDB… ). Nó sẽ bao gồm các class/function xử lý nhiều 
// nghiệp vụ như kết nối, truy vấn, thêm – sửa - xóa cơ sở dữ liệu…

// * Vỉew : là nới chứa những giao diện như một nút bấm, khung nhập, menu, hình 
// ảnh… nó đảm nhiệm nhiệm vụ hiển thị dữ liệu và giúp người dùng tương tác với 
// hệ thống.

// * Controller :  là nới tiếp nhận những yêu cầu xử lý được gửi từ người dùng, nó sẽ gồm những class/ function xử lý nhiều nghiệp vụ logic giúp lấy đúng dữ liệu 
// thông tin cần thiết nhờ các nghiệp vụ lớp Model cung cấp và hiển thị dữ liệu đó 
// ra cho người dùng nhờ lớp View.

// Thay các đoạn code ở phần tạo route




// -------------- TẠO TÍNH NĂNG ĐĂNG KÝ THÀNH VIÊN -----------------------

// Tạo file register.ejs trong views
// Tạo file storeUser.js, NewUser.js trong controllers
// Tạo file User.js trong models
// Tạo route cho các req
// Tạo nút trong navbar.ejs

// Mã hóa mật khẩu
// Dùng module bcrypt
// Khai báo trong models/User.js để 
// Tại Validation để ngăn không cho phép tạo 2 member trùng username, để mật khẩu trống
// Update lại UserSchema trong models/User/js
// Nếu một trong các rule bị vi phạm thì mongoose sẽ lưu dữ liệu đó vào trong DB và trả về 1 er
// In err ra thi thêm console.log(error) trong controllers/storeUser.js
// Nếu có lỗi thì refresh lại trang đăng ký, còn đăng ký thành công thì chuyển trang về trang chủ



// -------------- TẠO TÍNH NĂNG ĐĂNG NHẬP -----------------------

// Tạo tệp login.ejs trong views 
// Clone mã nguồn register.ejs qua 
// Thay các ndung lại cho phù hợp
// Khai báo login controllers trong đây 
// Thêm nút login trong navbar

// Xử lý thông tin đăng nhập 
// 1. Kiểm tra user đó có tồn tại trong DB không ?
// 2. Password được nhập có đúng với user đó không ?
// 3. Nếu mọi thứ đều OK thì redirect về trang chủ

// Tạo loginUser.js trong controllers
// Khai báo controllers trong đây


// -------------- GIỮ PHIÊN ĐĂNG NHẬP -----------------------

// Sử dụng module express-session

// Tính năng tạo và lưu session đăng nhập của người dùng
// Chỉnh sửa trong controllers/ loginUser.js
// Để xem chính xác thông tin của một session object
// Vào controllers/home.js thêm console.log(req.session)
// Kiểm tra session id trước khi cho phép người dùng tạo bài post 
// Thêm đoạn code vào trong controllers/newPost.js

// PROTECT MỘT PAGE NÀO ĐÓ VỚI AUTHENTICATION MIDDLEWARE
// Một số trang người dùng đăng nhập mới có thể truy cập
// Tạo custom middleware đặt tên /middleware/authMiddleware.js 
// Import middleware vào đây
// Để áp dụng middleware vào route khi tạo bài post thì cần đặt middleware trước newPostController là được.
// app.get('/posts/new', authMiddleware, newPostController)

// Xử lý menu dành cho người dùng
// Tạo redirectIfAuthenticatedMiddleware.js trong middleware
// Import middleware vào đây 
// Áp dụng cho 4 route /auth/register, /users/register, /auth/login, /users/login
// Ẩn các nút Login và NewUser sau khi đăng nhập trên Menu
// Khai báo biến loggedIn = null trong đây, gán UsedID cho biến 
// Thêm kiểm tra điều kiện trong Navbar với các menu Login, New User, New Post 



// -------------- TẠO TÍNH NĂNG ĐĂNG XUẤT -----------------------

// Sử dụng hàm session.destroy()
// Thêm nút Log Out vào menu
// Tạo /controllers/logout.js
// Thêm controller vào index 



// -------------- TẠO TRANG 404 -----------------------

// Tạo notfound.ejs trong views
// Đăng ký route cho notfound