const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const Project = require('../models/projectModel')
const Issue = require('../models/issue')


router.post('/projects/new'  , projectController.createProject);
router.get('/projects/all' , projectController.allProjects);
router.get('/projects/all-issues/:id' , projectController.projectsWithIssues);
router.post('/project/issue/:id', projectController.raiseIssue);
router.get('/project/issue/:id', projectController.getProjectIssue);

router.get('/' , async(req,res)=>{
    try {
        let projects = await Project.find();
        if(!projects){
            projects = [];
        }
        res.render('home', {projects} )
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            data:[]
        })
    }
})



module.exports = router;