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
        const action = await Actions.get(req.params.id)
        if (action) {
            req.action = action
            next();
        } else {
            next({ status: 404, message: "Project not found!"})
        }
    } catch (err) {
        next(err);
    }
}

function verifyPayload(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes ) {
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