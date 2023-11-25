const express =  require("express");
const bodyParser = require('body-parser'); //panggil library bodyParser yang berfungsi agar dapat memanggil APi body
const mongoose = require('mongoose'); // memanggil library mongoose yang berfungsi untuk mengkoneksikan mongodb ke node js
const multer = require('multer'); // memanggil library multer yang berfungsi untuk upload image, file, dan video
const app = express(); // memanggil library express

//const productRoutes = require('./src/routes/products');
// memanggil fungsi dapat code di folder lain
const authRouter = require('./src/routes/auth');
const blogRouter = require('./src/routes/blog');

app.use(bodyParser.json());

// Mengatasi Error CORS Origin pada nodejs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

// mengatur url halaman
//app.use('/v1/customer', productRoutes);
app.use('/v1/auth', authRouter);
app.use('/v1/blog', blogRouter);

// mengecek error program
app.use((error, req, res, next) =>{
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(400).json({message: message, data: data})
});

// mengkoneksikan database mongodb dengan Nodejs
mongoose.connect('mongodb+srv://miqbalm01:Kitapastisatu21@atlascluster.b98jwcf.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
    app.listen(5000, () => console.log('Connection Success'));
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
