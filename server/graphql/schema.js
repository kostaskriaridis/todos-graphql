const { gql } = require('apollo-server-express');

module.exports = gql`
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
