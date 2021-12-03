// Write your "projects" router here!

const { Router } = require('express');
const express = require('express');

// import middleware at some point

const Projects = require('./projects-model')
const router = express(Router);

//Verify ID, Verify Body, errorHandle, 

// GET /api/projects returns projects

//GET /api/projects/id gets by ID

// POST /api/projects returns new project as body

// PUT /api/projects/id updates project as body of response 

// DELETE /api/projects/id deletes, returns no response body

// GET /api/projects/id/actions returns actions of specific ID