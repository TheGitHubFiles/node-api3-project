const express = require('express');
const userRouter = require('./users/userRouter');
const server = express();
server.use(express.json());
server.use("/api/users", userRouter);
server.get('/', (req, res) => {
  res.send(`<h2>hi</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
