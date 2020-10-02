const express = require('express');
const dbConfig = require('../data/dbConfig');
const router = express.Router();
const db = require('../data/helpers/actionModel');

router.get('/:id', validateActionId, (req,res) => {
    res.status(200).json(req.valData);
})

function validateActionId(req,res,next) {
    db
    .get(parseInt(req.params.id))
    .then(res => {
        req.valData = res;
        if(!res) {
            throw new Error()
        }
        next();
    })
    .catch(err => {
        if(!req.valData) {
            return res.status(404).json({ message: 'Cannot find action with specified ID.' })
        }
        res.status(500).json({ message: 'Unable to get action data.' });
    })
}

module.exports = router;