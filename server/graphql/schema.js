const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
type Todo {
    id: Int
    text: String
    completed: Boolean
}
type Query {
    todos: [Todo]
}
type Mutation {
    createTodo(text: String!): Todo
    updateTodo(id: ID!, text: String, completed: Boolean): Todo
    deleteTodo(id: ID!): Todo
}
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });