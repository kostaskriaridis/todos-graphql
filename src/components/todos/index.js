import React, { PureComponent } from 'react';
import { compose, graphql } from 'react-apollo';
import Form from './form';
import Todo from '../todo';
import {
    TODOS_QUERY,
    TODO_CREATE_MUTATION,
    TODO_UPDATE_MUTATION,
    TODO_DELETE_MUTATION
} from './query';
import {
    createOptions,
    createOptimisticResponse,
    updateOptions,
    updateOptimisticResponse,
    deleteOptions,
    deleteOptimisticResponse
} from './options';

class Todos extends PureComponent {
    render() {
        const { loading, error } = this.props.data;

        return (
            <div>
                <Form
                    disabled={loading || Boolean(error)}
                    onSubmit={this.handleCreateTodo} />
                {this.renderTodos()}
            </div>
        );
    }

    renderTodos() {
        const { todos, loading, error } = this.props.data;

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
                        onUpdateTodo={this.handleUpdateTodo}
                        onDeleteTodo={this.handleDeleteTodo} />
                ))}
            </ul>
        );
    }

    handleCreateTodo = text => {
        this.props.createTodo({
            variables: { text },
            optimisticResponse: createOptimisticResponse(text)
        });
    };

    handleUpdateTodo = (todoId, todo) => {
        this.props.updateTodo({
            variables: {
                todoId,
                ...todo
            },
            optimisticResponse: updateOptimisticResponse(todoId, todo)
        });
    };

    handleDeleteTodo = todoId => {
        this.props.deleteTodo({
            variables: { todoId },
            optimisticResponse: deleteOptimisticResponse(todoId)
        });
    };
}

export default compose(
    graphql(TODOS_QUERY),
    graphql(TODO_CREATE_MUTATION, createOptions),
    graphql(TODO_UPDATE_MUTATION, updateOptions),
    graphql(TODO_DELETE_MUTATION, deleteOptions)
)(Todos);
