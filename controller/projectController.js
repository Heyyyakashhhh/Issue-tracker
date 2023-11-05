
const db = require('../database/connection')
const mongoose = require('mongoose')
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const Project = require('../models/projectModel');
const Issue = require('../models/issue')

module.exports.createProject = async (req, res) => {
  

    try {
        const projectName = req.body.projectName;
        const description = req.body.description;
        const author = req.body.author;

        const newProject = new Project({
            projectName: projectName,
            description: description,
            author: author
        });

        const projectData = await newProject.save();
        

        if (!projectData) {
            console.log("Project data not saved.");
            return res.status(500).json({
                message: 'Project data not saved.',
                data: []
            });
        }
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({
            message: 'Server error',
            data: []
        });
    }
};
module.exports.raiseIssue = async (req, res) => {
    let projectId = req.params.id;
    const { title, description, author,lable } = req.body;


    try {
        const newIssue = new Issue({
            title: title,
            description: description,
            author: author,
            projectID: projectId,
            lable:lable
        });

        const issueData = await newIssue.save();
        console.log(issueData.title)
        
        if (issueData) {
            req.flash('success_msg', 'Issue raised successfully');

            // Redirect back to the same page with the issue data
            res.redirect(`/project/issue/${projectId}`);
        }
    } catch (error) {
        console.log("Error in raising issue in projects:", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
};

module.exports.getProjectIssue = async (req, res) => {
    try {
        let projectID = req.params.id;

        let validProject = await Project.findOne({ _id: projectID });
        let issueData = await Issue.find({projectID:projectID})
  
         if (!validProject) {
            validProject = [];
        }

        res.render('issue', { issueData, validProject });

    } catch (error) {
        console.error("Error fetching project issue:", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
};




module.exports.allProjects = async(req,res)=>{
    try {

        const findProject = await Project.find({});
        res.status(201).json({
            message: "All project are here",
            data : findProject
        })
      
        
    } catch (error) {
        res.status(500).json({
            message: "Server error contact with the application devloper",
            data:[]
        });
        console.log("Error in finding projects : " , error)
    }
}


module.exports.perticulerProject = async(req,res)=>{

  
    const projectId  =  req.params.id;
    try {
        const validProject = await Project.findOne({_id:projectId});
        if(!validProject){
             res.status(400).json({
                message:"This project not found ",
                data:[]
            })
        };

        
        
        
    } catch (error) {
         res.status(500).json({
            message: "Server side problem please contact with the devloper team",
            data: []
        });
        console.log("Error in finding pertuculer project: ", error)
    }
}

module.exports.projectsWithIssues = async(req,res)=>{
    const projectID = req.params.id
 
    try {
        // Fetch the project from the database using the Project model (adjust as per your model)
        const project = await Issue.findOne({projectID}).populate('projectID')// Assuming 'issues' is a field in the Project model that references its issues
    
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
    
        // If the project is found, respond with the project details along with its issues
       
        return res.status(200).json({
            message: "Project details with the raised issues",
            data : project
        });
      } catch (error) {
        return res.status(500).json({ message: 'Error finding project', error: error.message });
      }
}