import { useMutation } from '@apollo/react-hooks';
import {
    TODOS_QUERY,
    TODO_CREATE_MUTATION,
    TODO_UPDATE_MUTATION,
    TODO_DELETE_MUTATION
} from './query';

/**
 * Returns a function for todo creation
 * @returns {Function}
 */
export function useCreateMutation() {
    const [createTodo] = useMutation(
        TODO_CREATE_MUTATION,
        {
            update(cache, { data: { createTodo } }) {
                const { todos } = cache.readQuery({ query: TODOS_QUERY });

                cache.writeQuery({
                    query: TODOS_QUERY,
                    data: { todos: todos.concat(createTodo) }
                });
            }
        }
    );

    return function(text) {
        createTodo({
            variables: { text },
            optimisticResponse: {
                __typename: 'Mutation',
                createTodo: {
                    __typename: 'Todo',
                    id: -1,
                    completed: false,
                    text
                }
            }
        });
    };
}

/**
 * Returns a function for todo update
 * @returns {Function}
 */
export function useUpdateMutation() {
    const [updateTodo] = useMutation(
        TODO_UPDATE_MUTATION,
        {
            update(cache, { data: { updateTodo } }) {
                const { todos } = cache.readQuery({ query: TODOS_QUERY });

                cache.writeQuery({
                    query: TODOS_QUERY,
                    data: {
                        todos: todos.map(todo => {
                            if (todo.id === updateTodo.id) {
                                return updateTodo;
                            }

                            return todo;
                        })
                    }
                });
            }
        }
    );

    return function(todo) {
        updateTodo({
            variables: todo,
            optimisticResponse: {
                __type: 'Mutation',
                updateTodo: {
                    __typename: 'Todo',
                    ...todo
                }
            }
        });
    };
}

/**
 * Returns a function for todo deleting
 * @returns {Function}
 */
export function useDeleteMutation() {
    const [deleteTodo] = useMutation(
        TODO_DELETE_MUTATION,
        {
            update(cache, { data: { deleteTodo } }) {
                const { todos } = cache.readQuery({ query: TODOS_QUERY });

                cache.writeQuery({
                    query: TODOS_QUERY,
                    data: { todos: todos.filter(todo => todo.id !== deleteTodo.id) }
                });
            }
        }
    );

    return function(id) {
        deleteTodo({
            variables: { id },
            optimisticResponse: {
                __type: 'Mutation',
                deleteTodo: {
                    __typename: 'Todo',
                    id
                }
            }
        });
    };
}
