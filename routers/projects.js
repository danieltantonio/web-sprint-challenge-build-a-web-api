const express = require('express');
const router = express.Router();
const db = require('../data/helpers/projectModel');

router.get('/:id', validatePostId, (req,res) => {
    res.status(200).json(req.valData);
});

router.post('/', (req,res) => {
    const { name, description, completed } = req.body;
    if(!req.body || !name || !description) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    db
    .insert(req.body)
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Unable to post project.' });
    })
});

function validatePostId (req,res,next) {
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
            return res.status(404).json({ message: 'Cannot find project with specified ID.' })
        }
        res.status(500).json({ message: 'Unable to get project data.' });
    })
};

module.exports = router;