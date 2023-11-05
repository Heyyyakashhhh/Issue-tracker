//Mongdb connection setup here..
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("mongodb connected succsesfully.."))
.catch((error)=>console.log("mongodb connection failed : " , error));
const db=mongoose.connection;
module.exports = db;