const express = require('express');
const db = require('./data/dbConfig.js');

const router = express.Router();

function validateAccount(req, res, next) {
    if (req.body) {
        next();
    } else {
        res.status(400).json({ error: "please provide and/or name and budget"})
    }
}

router.get('/', (req, res) => {
    const { limit, sortby, sortdir } = req.query;
    const query = db('accounts');

    limit && query.limit(limit);
    sortby
        ? sortdir
        ? query.orderBy(sortby, sortdir)
        : query.orderBy(sortby)
        : null

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
            res.status(201).json({ "new account id": account })
        })
        .catch(err => {
            res.status(500).json({ error: 'error adding account' })
        })
});

router.put('/:id', validateAccount, (req, res) => {
    const changes = req.body;
    db('accounts')
        .where('id', '=', req.params.id)
        .update(changes)
            .then(count => {
                count > 0 
                ? res.status(200).json({ "accounts updated": count })
                : res.status(404).json({ error: "id not found" })
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
                count > 0 
                ? res.status(200).json({ "accounts deleted": count })
                : res.status(404).json({ error: "id not found" })
            })
            .catch(err => {
                res.status(500).json({ error: "error deleting account" })
            })
});

module.exports = router;