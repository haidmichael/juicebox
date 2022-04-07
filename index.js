require('dotenv').config();

console.log(process.env.JWT_Secret);

const PORT = 3000;
const express = require('express');
const server = express();

const morgan = require('morgan'); //correct placement of this? 
server.use(morgan('dev'));

server.use(express.json())

const { client } = require('./db');
client.connect();

server.use((req, res, next) => {
    console.log('<----Body Logger Start---->');
    console.log(req.body);
    console.log("<----Body Logger End---->");

    next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log('the server is up on port', PORT)
});

