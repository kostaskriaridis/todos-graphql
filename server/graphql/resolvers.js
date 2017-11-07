const { Todo } = require('../db/connectors');

module.exports = {
    Query: {
        todos() {
            return Todo.findAll();
        }
    },

    Mutation: {
        async createTodo(root, args) {
            return await Todo.create({
                text: args.text,
                completed: false
            });
        },

        async updateTodo(root, args) {
            const todo = await Todo.findById(args.id);

            todo.update(args);

            return todo;
        },

        async deleteTodo(root, args) {
            const todo = await Todo.findById(args.id);

            todo.destroy();
        }
    }
};
