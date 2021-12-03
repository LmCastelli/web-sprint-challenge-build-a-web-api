// Write your "actions" router here!
const express = require('express');

const {
    errorHandling,
    verifyId,
    verifyPayload,
} = require('./actions-middleware')

const Actions = require('./actions-model')
const router = express.Router();

router.get('/', (req, res, next) =>  {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id', verifyId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', verifyPayload, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', verifyId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(projects => { // eslint-disable-line
            res.status(200).json({ message: "Project removed"})
        })
        .catch(err => {
            next(err);
        })
})

router.use(errorHandling);


module.exports = router;