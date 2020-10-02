const express = require('express');
const dbConfig = require('../data/dbConfig');
const router = express.Router();
const db = require('../data/helpers/actionModel');

router.get('/:id', validateActionId, (req,res) => {
    res.status(200).json(req.valData);
});

router.post('/', (req,res) => {
    const { description, notes, project_id } = req.body;
    if(!req.body || !description || !project_id) {
        return res.status(400).json({ message: 'Missing required data.' });
    }

    db
    .insert(req.body)
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to create project action.' });
    })
});

router.delete('/:id', validateActionId, (req,res) => {
    db
    .remove(parseInt(req.params.id))
    .then(data => {
        res.status(202).json(req.valData);
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to remove project action.' });
    })
});

router.put('/:id', validateActionId, (req,res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Missing required data.' });
    }

    db
    .update(parseInt(req.params.id), req.body)
    .then(data => {
        res.status(202).json(data);
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to update project action.' });
    })
});

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