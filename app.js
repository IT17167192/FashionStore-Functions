const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// import mongoose
const mongoose = require('mongoose');
//import routes
const userRoutes = require('./routes/user');

//allow to use env variables
//load env variables
require('dotenv').config();

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

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
//routes middleware
app.use('/api', userRoutes);