require('dotenv').config();

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

server.get('/add/:first/to/:second', (req, res, next) => {
    res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
      Number(req.params.first) + Number(req.params.second)
     }</h1>`);
  });

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log('the server is up on port', PORT)
});

