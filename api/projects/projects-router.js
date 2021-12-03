// Write your "projects" router here!
const express = require('express');

const {
    errorHandling, 
    verifyId, 
    verifyPayload,
} = require('./projects-middleware')

const Projects = require('./projects-model')
const router = express.Router();

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

router.get('/:id', verifyId, (req, res) => {
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
            res.status(200).json(project)
        })
        .catch(err => {
            next(err);
        })
})

// DELETE /api/projects/id deletes, returns no response body

router.delete('/:id', verifyId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(projects => { // eslint-disable-line
            res.status(200).json({ message: "Project removed"})
        })
        .catch(err => {
            next(err);
        })
})

// GET /api/projects/id/actions returns actions of specific ID

router.get('/:id/actions', verifyId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            next(err);
        })
})

router.use(errorHandling);

module.exports = router;