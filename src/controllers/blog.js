const {validationResult} = require('express-validator'); //  untuk mendapatkan hasil dari validasi yang telah ditentukan sebelumnya dalam middleware express-validator.
const BlogPost = require('../models/blog'); // mengimpor model BlogPost dari direktori ../models/blog. Model ini adalah model Mongoose yang merepresentasikan entitas blog yang telah Anda definisikan sebelumnya.
const { post } = require('../routes/auth');
const path = require('path'); // Modul path digunakan untuk melakukan operasi pada path direktori file dan direktori.
const fs = require('fs');


exports.createBlogPost = (req,res,next) => { // fungsi handler atau controller untuk endpoint pembuatan posting blog. Fungsi ini menerima req (request), res (response), dan next (next middleware) sebagai argumen.

    // validasi data
    // Untuk mendapatkan hasil dari validasi yang telah ditetapkan sebelumnya menggunakan express-validator pada body request yang masuk. validationResult(req) akan mengumpulkan hasil validasi yang telah didefinisikan sebelumnya dalam middleware express-validator.
    const errors = validationResult(req);

    // Cek Error Data
    // pengecekan apakah ada kesalahan validasi dari errors. Jika terdapat kesalahan, Anda membuat objek Error baru yang menandakan bahwa terjadi kesalahan validasi dengan kode status 400 (Bad Request) dan data yang berisi array dari kesalahan validasi.
    if(!errors.isEmpty()){
        const err = new Error('Invalid Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    // Cek Upload Gambar
    // Pengecekan apakah terdapat file dalam permintaan. Jika tidak ada file yang di-upload, Anda membuat objek Error baru yang menandakan bahwa gambar harus di-upload dengan kode status 422 (Unprocessable Entity).
    if(!req.file){
        const err = new Error('Gambar Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }
    
    //menyimpan value pada body API, ke sebuah variabel lokal
    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    // Membuat Struktur Data yang akan di simpan di mongo db
    // membuat instance baru dari model BlogPost menggunakan data yang telah Anda ambil dari req.body dan req.file.
    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {uid: 1, name:'Iqbal Maulana'}
    })
    
    // menyimpan data di variabel Posting ke mongodb
    // method dari Mongoose yang digunakan untuk menyimpan data ke dalam database MongoDB. Anda menggunakan save() untuk menyimpan data posting blog yang baru dibuat ke dalam koleksi 'BlogPost'.
    Posting.save()
    .then(result => {
        res.status(201).json({ // menangani hasil dari penyimpanan data. Jika penyimpanan berhasil, Anda mengirimkan respons dengan status 201 (Created) dan mengirimkan pesan bahwa posting blog telah berhasil dibuat bersama dengan data yang disimpan.
            message: 'Create Blog Post Success',
            data: result 
        })
    })
    .catch(err =>{  // Jika ada kesalahan saat melakukan penyimpanan data, Anda menangani kesalahan tersebut di bagian catch.
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

exports.getAllBlogPost = (req,res,next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    // localhost:5000/v1/blog/posts?page=2&perPage=1 
    // URL yang akan di tampil di browser API 
    let totalItems;
    
    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return BlogPost.find()
        .skip((parseInt(currentPage) - 1)* parseInt(perPage))
        .limit(parseInt(perPage));
    })

    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil di panggil',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err => {  
        next(err);
    })
}

exports.getBlogPostId = (req,res,next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Blog Post Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data Blog Post Ditemukan',
            data: result  
        })
    })
    .catch(err => {  
        next(err);
    })
}

exports.updateBlogPost = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Error');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Gambar Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Blog Post Tidak Ditemukan2');
            err.errorStatus = 404;
            throw err;
        }
        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Sukses',
            data: result,
        })
    })
    .catch(err => {  
        next(err);
    })
}

exports.deleteBlogPost = (req,res,next) => {
    const postId = req.params.postId;
    
    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Blog Post Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        }

        removeImage(post.image);
        return BlogPost.findOneAndDelete(postId);
    })
    .then(result => { 
        res.status(200).json({
            message: 'Blog Post Berhasil di hapus',
            data: result,  
        });
    })
    .catch(err => {  
        next(err);
    });
}

const removeImage = (filePath) => {
    console.log('filepath :', filePath);
    console.log('dirname :', __dirname);

    filePath = path.join(__dirname, '../../', filePath);
    fs.unlink(filePath, err => {
        if (err) {
            console.error('Error saat menghapus gambar:', err);
        } else {
            console.log('Gambar berhasil dihapus');
        }
    });
}

// Kode memanggil APi seluruh data pada mongodb
// exports.getAllBlogPost = (req,res,next) => {
    
//     BlogPost.find()
//     .then(result => {
//         res.status(200).json({
//             message: 'Data Blog Post Berhasil di panggil',
//             data: result 
//         })
//     })
//     .catch(err => {  
//         next(err);
//     })
// }