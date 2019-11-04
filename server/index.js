const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer({
    typeDefs: require('./graphql/schema'),
    resolvers: require('./graphql/resolvers')
});

const app = express();

server.applyMiddleware({ app });

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}/${server.graphqlPath}!`);
});
