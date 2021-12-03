// add middlewares here related to actions
const Actions = require('./actions-model')

function errorHandling(err, req, res, next) { //eslint-disable-line
    res.status(err.status || 500).json({
        message: ` There was an error ${err.message} `,
        stack: err.stack
    });
}

async function verifyId(req, res, next) {
    try {
        const project = await Actions.get(req.params.id)
        if (project) {
            req.project = project
            next();
        } else {
            next({ status: 404, message: "Project not found!"})
        }
    } catch (err) {
        next(err);
    }
}

function verifyPayload(req, res, next) {
    if (!req.body.name || !req.body.description || !req.body.notes || !req.body.completed) {
        next({status: 400, message: "Missing some info!"})
    } else {
        next();
    }
}

module.exports = {
    errorHandling,
    verifyId,
    verifyPayload
}