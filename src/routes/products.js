const express =  require("express");

const router = express.Router();

const productsController =  require("../controllers/products");

router.use('/product', productsController.createProduct);

router.use('/productall', productsController.getAllProducts);


// router.use('/products', (req,res,next)=>{
//     res.json({name: "Muhamad Iqbal Maulana", email: "iqbal@gmail.com"});
//     next();
// })

module.exports = router;
