// add middlewares here related to projects
const Projects = require('./projects-model');

function errorHandling(err, req, res, next) {
    res.status(err.status || 500).json({
        message: ` There was an error ${err.message} `,
        stack: err.stack
    });
}

function verifyId(req, res, next)

module.exports = {
    errorHandling,
}