const express = require('express');
const app = express();

// import mongoose
const mongoose = require('mongoose');

//allow to use env variables
//load env variables
require('dotenv').config();

app.get('/', (req, res) => {
   res.send('hellow from server');
});

//nodejs run in this port
const port = process.env.PORT || 8000;

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
)
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
   console.log(`DB connection error: ${err.message}`)
});