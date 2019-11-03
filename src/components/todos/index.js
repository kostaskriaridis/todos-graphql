import React, { useState } from 'react';
import Todo from '../todo';

export default function Todos({ loading, error, todos, onUpdateTodo, onDeleteTodo }) {
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
