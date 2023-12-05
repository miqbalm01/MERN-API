standar API

[METHOD] : {root.api}/{version}/{grouping}/{endpoint}
SAMPLE:
[POST] : http://mern-api.toko.com/v1/auth/login

==========================

Standar Status Response

200 - OK                        -> Call API Success
201 - CREATED                   -> Post Success
400 - BAD REQUEST               -> Error On Client Side (Bisa Input yang salah dll)
401 - UNAUTHORIZED              -> User not authorized to the request
403 - FORBIDDEN                 -> User not allowed to access
404 - NOT FOUND                 -> Request Endpoint Not Found
500 - INTERNAL SERVER ERROR     -> Error on Server Side
502 - BAD GATEWAY               ->  Invalid Response From Anthoer Request

==========================

GROUP: Authentication
[1] - Register
{root.api}/{version}/auth/register

req: // Perintah Request API
{
    "name": "John Doe",
    "email": "test@gmail.com",
    "password": "123"
}

res : // Perintah Response API
{
    "message": "register Success",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "test@gmail.com",
        "password": "123"
    }
}

err - response:
400 -> Input yang anda masukkan tidak valid

[2] - Login
{root.api}/{version}/auth/login

req: // Perintah Request API
{
    "email": "test@gmail.com",
    "password": "123"
}

GROUP : BLOG
[1] - Create Blog Post
{root.api}/{version}/auth/post

req: // Perintah Request API
{
    "title": "Title Blog",
    "image": "imagefile.png",
    "body": "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et"
}

res : // Perintah Response API
{
    "message": "Create Blog Post Success",
    "data": {
        "post_id": 1,
        "title": "Title Blog",
        "image": "imagefile,png",
        "body": "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
        "created_at" : "12/06/2020"
        "author" : {
            "uid": 1,
            "name": "Testing"
        }
    }
}

err - response:
201 -> Blog Post berhasil di buat
400 -> Input yang anda masukkan tidak valid

[2] - Get Blog Post
[3] - Update Blog Post
[4] - Delete Blog Post


project/
│
├── node_modules/
│   └──  // Dependencies yang diinstal
│
├── src/
│   ├── controllers/
│   │   └──  // Logika bisnis atau "controllers" aplikasi
│   │
│   ├── models/
│   │   └──  // Definisi model-model basis data (Mongoose schemas, dll.)
│   │
│   ├── routes/
│   │   └──  // Definisi rute-rute aplikasi Express
│   │
│   ├── middleware/
│   │   └──  // Middleware aplikasi
│   │
│   ├── config/
│   │   └──  // Konfigurasi aplikasi (konfigurasi database, konfigurasi environment, dll.)
│   │
│   └── app.js atau index.js
│       // Entry point aplikasi, konfigurasi Express, dan pengaturan server
│
├── public/
│   └──  // File-file publik (HTML, CSS, JS, gambar, dll.)
│
├── tests/
│   └──  // Unit tests atau integration tests
│
├── package.json
│   // Informasi proyek, dependensi, dan skrip untuk menjalankan proyek
│
└── README.md
    // Dokumentasi proyek