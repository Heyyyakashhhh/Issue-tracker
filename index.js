const express = require('express');
const app = express();
const db  = require('./database/connection');
const path  = require('path')
const  route  = require('./routes/routes');
const viewPath  = path.join(__dirname, "./views");
const publicPath  = path.join(__dirname, "./public");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash'); // Require express-flash

// Other configurations...
app.use(
    session({
        secret: 'your-secret',
        resave: true,
        saveUninitialized: true
    })
);

// Use express-flash to enable flash messages
app.use(flash());



app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath))

app.use('/' , route)


app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
} );