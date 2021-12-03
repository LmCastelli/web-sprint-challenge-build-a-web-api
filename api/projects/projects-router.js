// Write your "projects" router here!

const { Router } = require('express');
const express = require('express');

// import middleware at some point

const {
    errorHandling, 
    verifyId, 
    verifyPayload,
} = require('./projects-middleware')

const Projects = require('./projects-model')
const router = express(Router);

//Verify ID, Verify Body, errorHandle, 

// GET /api/projects returns projects

router.get('/', (req, res, next) =>  {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            next(err);
        })
})

//GET /api/projects/id gets by ID

router.get('/:id', verifyId, (req, res, next) => {
    res.status(200).json(req.project)
})

// POST /api/projects returns new project as body

router.post('/', verifyPayload, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            next(err);
        })
})

// PUT /api/projects/id updates project as body of response 

router.put('/:id', verifyId, verifyPayload, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            next(err);
        })
})

// DELETE /api/projects/id deletes, returns no response body

router.delete('/:id', (req, res, next) => {

})

// GET /api/projects/id/actions returns actions of specific ID

router.get('/:id/actions', (req, res, next) => {

})

router.use(errorHandling);

module.exports = router;