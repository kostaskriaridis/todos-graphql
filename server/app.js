const express = require('express');
const path = require('path');
const { graphqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require('./graphql/schema');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

module.exports = app;
