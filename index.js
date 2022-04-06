const PORT = 3000;
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

const { client } = request('./db');
client.connect();

server.listen(PORT, () => {

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log('the server is up on port', PORT)
});

server.use((req, res, next) => {
    console.log('<----Body Logger Start---->');
    console.log(req.body);
    console.log("<----Body Logger End---->");

    next();
});

});