import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../todo';

Todos.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
        message: PropTypes.string.isRequired
    }),
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
};

export default function Todos({
    loading,
    error,
    todos,
    onUpdateTodo,
    onDeleteTodo
}) {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!todos.length) {
        return <div>No todos added yet</div>;
    }

    return (
        <ul>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    completed={todo.completed}
                    text={todo.text}
                    onUpdateTodo={onUpdateTodo}
                    onDeleteTodo={onDeleteTodo} />
            ))}
        </ul>
    );
}
