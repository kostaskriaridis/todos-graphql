const Sequelize = require('sequelize');

const db = new Sequelize('todos', null, null, {
    dialect: 'sqlite',
    storage: './todos.sqlite'
});

const TodoModel = db.define('todo', {
    text: { type: Sequelize.STRING },
    completed: { type: Sequelize.BOOLEAN }
});

db.sync({ force: true }).then(() => {
    ['Learn JS', 'Learn ReactJS', 'Learn Redux', 'Learn Graphql'].forEach(todo => {
        TodoModel.create({
            text: todo,
            completed: false
        });
    });
});

module.exports = {
    Todo: db.models.todo
};
