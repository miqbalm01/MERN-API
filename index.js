const express =  require("express");

const app = express();
const productRoutes = require('./src/routes/products');

app.use('/', productRoutes)

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

app.use('/', router);

app.listen(5000);