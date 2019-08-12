const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(logger);

function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to '${url}' at ${timestamp}`);
    next()
};

server.get('/', (req, res) => {
    res.status(200).json({ message: "it's working!" })
});

server.get('/accounts', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ error: 'error getting accounts' })
        })
});

server.post('/accounts', (req, res) => {
    const post = req.body;
    db('accounts').insert(post, 'id')
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            res.status(500).json({ error: 'error adding account' })
        })
});

server.put('/accounts/:id', (req, res) => {
    
});

server.delete('/accounts/:id', (req, res) => {
    
});

module.exports = server;