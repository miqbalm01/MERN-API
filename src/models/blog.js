const mongoose = require('mongoose'); // mengimpor modul Mongoose, sebuah ODM (Object Data Modeling) untuk MongoDB
const Schema = mongoose.Schema; // mendeklarasikan variabel Schema dan menetapkannya ke mongoose.Schema. Schema digunakan untuk mendefinisikan struktur atau blueprint dari dokumen yang akan disimpan dalam koleksi MongoDB.

// Membuat Struktur database mongodb pada Blog
const BlogPost = new Schema({
    //title, body, image, dan author: Ini adalah field atau properti dari dokumen yang disimpan dalam database 'BlogPost' di mongo db.
    // Setiap field memiliki tipe datanya (String, Object, dll) dan juga properti tambahan seperti required: true yang menandakan bahwa field-field tersebut wajib diisi saat membuat dokumen baru.
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    author:{
        type: Object,
        required: true,
    }
},{
    timestamps:true // timestamps: true: Properti ini menandakan bahwa Mongoose akan secara otomatis menambahkan dua field tambahan, createdAt dan updatedAt
});

module.exports = mongoose.model('BlogPost', BlogPost);
// Eksport model yang telah dibuat. Dengan mongoose.model(), Anda membuat model MongoDB berdasarkan skema BlogPost yang telah Anda definisikan sebelumnya