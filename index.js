const express =  require("express");

const app = express();

app.use(() => {
    console.log('hello server...');
    console.log('hello server2...');
})

app.listen(5000);