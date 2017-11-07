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
    graphql(TODO_CREATE_MUTATION, {
        options: {
            update: (proxy, { data: { createTodo } }) => {
                const data = proxy.readQuery({ query: TODOS_QUERY });

                data.todos.push(createTodo);

                proxy.writeQuery({ query: TODOS_QUERY, data });
            }
        },
        name: 'createTodo'
    }),
    graphql(TODO_UPDATE_MUTATION, {
        options: {
            update: (proxy,{ data: { updateTodo } }) => {
                const data = proxy.readQuery({ query: TODOS_QUERY });

                data.todos = data.todos.map(todo => {
                    if (todo.id === updateTodo.id) {
                        return updateTodo;
                    }

                    return todo;
                });

                proxy.writeQuery({ query: TODOS_QUERY, data });
            }
        },
        name: 'updateTodo'
    }),
    graphql(TODO_DELETE_MUTATION, {
        options: {
            update: (proxy,{ data: { deleteTodo } }) => {
                const data = proxy.readQuery({ query: TODOS_QUERY });

                data.todos = data.todos.filter(todo => todo.id !== deleteTodo.id);

                proxy.writeQuery({ query: TODOS_QUERY, data });
            }
        },
        name: 'deleteTodo'
    })
)(Todos);
