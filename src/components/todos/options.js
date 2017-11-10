import { TODOS_QUERY } from './query';

function readTodosQuery(proxy) {
    return proxy.readQuery({ query: TODOS_QUERY });
}

function writeTodosQuery(proxy, data) {
    proxy.writeQuery({ query: TODOS_QUERY, data });
}

export const createOptions = {
    options: {
        update: (proxy, { data: { createTodo } }) => {
            const data = readTodosQuery(proxy);

            data.todos.push(createTodo);

            writeTodosQuery(proxy, data);
        }
    },
    name: 'createTodo'
};

export function createOptimisticResponse(text) {
    return {
        __typename: 'Mutation',
        createTodo: {
            __typename: 'Todo',
            id: -1,
            completed: false,
            text
        }
    };
}

export const updateOptions = {
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

export function updateOptimisticResponse(todoId, name, value) {
    return {
        __typename: 'Mutation',
        updateTodo: {
            __typename: 'Todo',
            id: todoId,
            [name]: value
        }
    };
}

export const deleteOptions = {
    options: {
        update: (proxy,{ data: { deleteTodo } }) => {
            const data = readTodosQuery(proxy);

            data.todos = data.todos.filter(todo => todo.id !== deleteTodo.id);

            writeTodosQuery(proxy, data);
        }
    },
    name: 'deleteTodo'
};

export function deleteOptimisticResponse(todoId) {
    return {
        __typename: 'Mutation',
        deleteTodo: {
            __typename: 'Todo',
            id: todoId
        }
    };
}
