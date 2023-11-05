const mongoose = require('mongoose')
const db  = require('../database/connection')

const projectSchema = mongoose.Schema({
    projectName :{
        type: String,
        required: true,
    },

    description: {
        type: String,
        max: 500
    },

    author:{
        type:String,
        required:true,
    },
  
},{
    timestamps: true 
});

const Project = mongoose.model('Project' ,projectSchema )
module.exports=Project;