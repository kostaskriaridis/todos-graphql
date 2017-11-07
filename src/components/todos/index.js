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
    todoCreateOptions,
    todoUpdateOptions,
    todoDeleteOptions
} from './options';

class Todos extends PureComponent {
    nodes = {};

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
            variables: { text }
        });
    };

    handleUpdateTodo = (todoId, name, value) => {
        this.props.updateTodo({
            variables: {
                todoId,
                [name]: value
            }
        });
    };

    handleDeleteTodo = todoId => {
        this.props.deleteTodo({
            variables: { todoId }
        });
    };
}

export default compose(
    graphql(TODOS_QUERY),
    graphql(TODO_CREATE_MUTATION, todoCreateOptions),
    graphql(TODO_UPDATE_MUTATION, todoUpdateOptions),
    graphql(TODO_DELETE_MUTATION, todoDeleteOptions)
)(Todos);
