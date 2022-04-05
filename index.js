const PORT = 3000;
const express = require('express');
const server = express();

server.listen(PORT, () => {
    console.log('the server is up on port', PORT)
});

server.use((req, res, next) => {
    console.log('<----Body Logger Start---->');
    console.log(req.body);
    console.log("<----Body Logger End---->");

    next();
});