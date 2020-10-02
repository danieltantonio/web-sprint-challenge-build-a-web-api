const express = require('express');
const server = express();

const projectRouter = require('./routers/projects');
const actionRouter = require('./routers/actions');

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req,res) => {
    res.status(200).json({ message: 'Welcome to Daniel Antonio\'s First Unit 4 Web Sprint Challenge.'});
});

module.exports = server;