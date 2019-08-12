const express = require('express');
const db = require('./data/dbConfig.js');

const router = express.Router();

function validateAccount(req, res, next) {
    if (req.body.name) {
        if (req.body.budget) {
            next();
        } else {
            res.status(400).json({ error: "please provide budget" })
        }
    } else {
        res.status(400).json({ error: "please provide name" })
    }
}
router.get('/', (req, res) => {
    const { limit, sortby, sortdir } = req.query;
    const query = db('accounts');
    if (limit) {
        query.limit(limit);
    }
    if (sortby) {
        query.orderBy(sortby);
        if (sortdir) {
            // query.orderBy(sortby, sortdir);
            query.orderBy(sortby, `${sortdir}`);
        }
    }
    query
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ error: 'error getting accounts' })
        })
});

router.get('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({ error: "error getting account" })
        })
});

router.post('/', validateAccount, (req, res) => {
    const post = req.body;
    db('accounts').insert(post, 'id')
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            res.status(500).json({ error: 'error adding account' })
        })
});

// router.put('/accounts/:id', validateAccount, validateUpdateId, (req, res) => {
router.put('/:id', validateAccount, (req, res) => {
    const changes = req.body;
    db('accounts')
        .where('id', '=', req.params.id)
        .update(changes)
            .then(count => {
                if (count > 0) {
                    res.status(200).json(count)
                } else {
                    res.status(404).json({ error: "id not found" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "error updating account" })
            })
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where('id', '=', req.params.id)
        .del()
            .then(count => {
                if (count > 0) {
                    res.status(200).json(count)
                } else {
                    res.status(404).json({ error: "id not found" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "error deleting account" })
            })
});

module.exports = router;