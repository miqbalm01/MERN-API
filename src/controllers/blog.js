const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');
exports.createBlogPost = (req,res,next) => {

    //menyimpan value pada body API, ke sebuha variabel lokal
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    // validasi data
    const errors = validationResult(req);

    // Cek Error Data
    if(!errors.isEmpty()){
        const err = new Error('Invalid Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    // Membuat Struktur Data yang akan di simpan di mongo db
    const Posting = new BlogPost({
        title: title,
        body: body,
        author: {uid: 1, name:'Iqbal Maulana'}
    })
    
    // menyimpan data di variabel Posting ke mongodb
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

    // Cek Error pada program
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