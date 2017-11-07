import { TODOS_QUERY } from './query';

function readTodosQuery(proxy) {
    return proxy.readQuery({ query: TODOS_QUERY });
}

function writeTodosQuery(proxy, data) {
    proxy.writeQuery({ query: TODOS_QUERY, data });
}

export const todoCreateOptions = {
    options: {
        update: (proxy, { data: { createTodo } }) => {
            const data = readTodosQuery(proxy);

            data.todos.push(createTodo);

            writeTodosQuery(proxy, data);
        }
    },
    name: 'createTodo'
};


export const todoUpdateOptions = {
    options: {
        update: (proxy,{ data: { updateTodo } }) => {
            const data = readTodosQuery(proxy);

            data.todos = data.todos.map(todo => {
                if (todo.id === updateTodo.id) {
                    return updateTodo;
                }

                return todo;
            });

            writeTodosQuery(proxy, data);
        }
    },
    name: 'updateTodo'
};

export const todoDeleteOptions = {
    options: {
        update: (proxy,{ data: { deleteTodo } }) => {
            const data = readTodosQuery(proxy);

            data.todos = data.todos.filter(todo => todo.id !== deleteTodo.id);

            writeTodosQuery(proxy, data);
        }
    },
    name: 'deleteTodo'
};
