const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./routes/auth');
// const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/', authRouter);
// server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.use((req, res, next) => {
    const err = new Error("Route Not Found")
    err.status = 404
    next(err)
})

// global error handler
server.use((err, req, res, next) => {
    // console.log(err)
    res
    .status(err.status || 500)
    .json({
        error: {
            message: err.message
        }
    })
})

module.exports = server;
