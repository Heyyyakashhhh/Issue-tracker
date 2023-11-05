const mongoose = require('mongoose')
const db  = require('../database/connection');
const Project = require('./projectModel')

const projectSchema = mongoose.Schema({
     title :{
        type: String,
        required: true,
    },

    description: {
        type: String,
        max: 200
    },

    author:{
        type:String,
        required:true,

    },
    lable:{
        type: String
    },

    projectID :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Reference to the 'Project' model
    }
});


const Issue = mongoose.model('Issue' ,projectSchema )
module.exports = Issue