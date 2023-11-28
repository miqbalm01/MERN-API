const express = require('express'); // mengimpor modul express yang digunakan untuk membuat aplikasi web dengan Node.js menggunakan framework Express.
const router = express.Router();  // express.Router(). Ini memungkinkan pengelompokan rute-rute dalam satu objek yang dapat di-export dan di-import ke dalam aplikasi utama.
const {body} = require('express-validator'); // digunakan untuk melakukan validasi terhadap data dalam body request.

// mengimpor file atau modul blog.js dari direktori ../controllers
const blogController = require('../controllers/blog');
// [POST] : /v1/blog/post


router.post('/post',[ // mendefinisi rute HTTP dengan metode POST, Rutenya adalah /v1/blog/post
    body('title').isLength({min:5}).withMessage("Input title tidak sesuai"), //middleware yang menggunakan express-validator untuk menentukan aturan validasi untuk bidang 'title' dalam body request. Di sini, Anda memeriksa apakah panjang dari bidang 'title' minimal harus 5 karakter.
    body('body').isLength({min:5}).withMessage("Input body tidak sesuai"), // middleware serupa untuk memvalidasi bidang 'body' dalam body request dengan aturan minimal 5 karakter.
], blogController.createBlogPost);
 
module.exports = router; // mengekspor objek router