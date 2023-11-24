const express =  require("express");
const bodyParser = require('body-parser');
const app = express();
const productRoutes = require('./src/routes/products');

app.use(bodyParser.json());

// Mengatasi Error CORS Origin pada nodejs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})
app.use('/v1/customer', productRoutes);
app.listen(5000);

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
