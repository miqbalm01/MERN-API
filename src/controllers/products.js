exports.createProduct = (req,res,next)=>{

    // request API dari client 
    const name = req.body.name;
    const price = req.body.price;
    res.json(
        {
            message : "Create Product Success",
            data: {
                id: 1,
                name: name, 
                email: "iqbal@gmail.com",
                price: price
            }
            
        }
    );
    next();
}

exports.getAllProducts = (req,res,next) => {
    res.json(
        {
            message : "Get All Product Success",
            data: [
                {
                    id: 1,
                    name: "Muhamad Iqbal Maulana", 
                    email: "iqbal@gmail.com",
                    price: 9000
                }
            ]
            
        }
    );
    next();
}