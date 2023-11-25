const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');
exports.createBlogPost = (req,res,next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const Posting = new BlogPost({
        title: title,
        body: body,
        author: {uid: 1, name:'Iqbal Maulana'}
    })
    
    // Membuat API secara struktur data pada database mongodb
    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Blog Post Success',
            data: result 
        })
    })
    .catch(err =>{
        console.log('err: ', err);
    });

    // if(!errors.isEmpty()){
    //     console.log('err : ', errors);
    //     res.status(400).json({
    //         message: 'Request Error',
    //         data: null,
    //     })
    // }

    // Membuat API Secara Manual
    // const result = { 
    //     message: 'Create Blog Post Success',
    //     data: {
    //         post_id: 1,
    //         title: "Title Blog",
    //         image: "imagefile,png",
    //         body: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
    //         created_at : "12/08/2021",
    //         author : {
    //             uid: 1,
    //             name: "Testing"
    //         }
    //     }  
    // }
}