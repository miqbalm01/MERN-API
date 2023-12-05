const express =  require("express"); // Mengimpor framework Express yang digunakan untuk membangun aplikasi web di Node.js.
const bodyParser = require('body-parser'); // Middleware body-parser digunakan untuk membaca data dari body request. Namun, mulai dari Express 4.16+, express telah memiliki built-in support untuk parsing JSON dan URL-encoded data sehingga penggunaan body-parser tidak selalu diperlukan.
const mongoose = require('mongoose'); // Mengimpor Mongoose, sebuah library ODM (Object Data Modeling) untuk MongoDB yang menyederhanakan interaksi dengan basis data MongoDB menggunakan JavaScript.
const multer = require('multer'); // Middleware multer digunakan untuk mengelola multipart/form-data, khususnya untuk mengelola upload file.
const path = require('path'); // Modul path digunakan untuk melakukan operasi pada path direktori file dan direktori.
const app = express(); // membuat instance aplikasi Express

//const productRoutes = require('./src/routes/products');
// memanggil fungsi routing yang telah di buat pada folder lain
const authRouter = require('./src/routes/auth'); // Routing untuk fitur otentikasi.
const blogRouter = require('./src/routes/blog'); // Routing untuk fitur blog.

// Mengatur lokasi penyimpanan file dan nama file yang diupload.
const fileStorage = multer.diskStorage({
    // Mengatur Destinasi Penyimpanan Image
    destination: (req, file, cb) =>{
        cb(null, 'images');
    },
    // Mengatur Pennamaan Image
    filename:(req,file,cb) =>{
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

// Mengecek  filter untuk jenis file yang diterima.
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else {
        cb(null, false)
    }
}

// Middleware untuk parsing body dari request dalam format JSON.
app.use(bodyParser.json());
// Pemnggilan Middleware path image agar bisa di tampilakan
//Menggunakan middleware express.static untuk menyajikan file statis seperti gambar dari direktori images.
app.use('/images', express.static(path.join(__dirname, 'images')));
// Middleware multer yang menangani proses upload satu file dengan nama field 'image'.
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

// Mengatasi Error CORS Origin pada nodejs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

//app.use('/v1/customer', productRoutes);
// middleware mengatur url halaman Auth Login
app.use('/v1/auth', authRouter);
// middleware mengatur url halaman Blog
app.use('/v1/blog', blogRouter);

// Mengecek error program
app.use((error, req, res, next) =>{
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(400).json({message: message, data: data})
});

// Mengkoneksikan database mongodb dengan Nodejs
mongoose.connect('mongodb+srv://miqbalm01:Kitapastisatu21@atlascluster.b98jwcf.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
    // aplikasi Express dijalankan pada port 5000
    app.listen(3000, () => console.log('Connection Success'));
})
.catch(err => console.log(err));



// const router = express.Router();

// router.use('/products', (req,res,next)=>{
//     // console.log('url: ', req.originalUrl);
//     // console.log('method: ', req.method);
//     res.json({name: "Muhamad Iqbal Maulana", email: "iqbal@gmail.com"});
//     next();
// })

// router.use('/price', (req,res,next)=>{
//     res.json({price: 3000000});
//     next();
// })

// router.delete('/customers', (req,res,next)=>{
//     res.json({title: "Customer"});
//     next();
// })

//  
