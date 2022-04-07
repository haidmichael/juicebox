const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 3, username: 'joshua'}, 'server secret', { expiresIn: '1h' });

token;

const recoveredData = jwt.verify(token, 'server secret');

recoveredData;

jwt.verify(token, 'server secret');

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
