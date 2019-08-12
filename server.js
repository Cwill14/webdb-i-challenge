const express = require('express');

const accountRouter = require('./accountRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/accounts', accountRouter)

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

module.exports = server;