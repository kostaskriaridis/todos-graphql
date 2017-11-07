import React, { PureComponent } from 'react';
import { compose, graphql } from 'react-apollo';
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
        const { todos, loading, error } = this.props.data;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>{error.message}</div>;
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        ref={inputNode => this.nodes.input = inputNode}
                        type='text' />
                    <button type='submit'>
                        Add
                    </button>
                </form>
                {this.renderTodos()}
            </div>
        );
    }

    renderTodos() {
        const { todos } = this.props.data;

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

    handleSubmit = event => {
        event.preventDefault();

        const inputNode = this.nodes.input;
        const value = inputNode.value.trim();

        if (!value) {
            return;
        }

        this.props.createTodo({
            variables: { text: value }
        });

        inputNode.value = '';
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
                const data = proxy.readQuery({
                    query: TODOS_QUERY
                });

                data.todos.push(createTodo);

                proxy.writeQuery({
                    query: TODOS_QUERY,
                    data
                });
            }
        },
        name: 'createTodo'
    }),
    graphql(TODO_UPDATE_MUTATION, {
        options: {
            update: (proxy,{ data: { updateTodo } }) => {
                const data = proxy.readQuery({
                    query: TODOS_QUERY
                });

                const todoIndex = data.todos.findIndex(todo => todo.id === updateTodo.id);

                data.todos[todoIndex] = updateTodo;

                proxy.writeQuery({
                    query: TODOS_QUERY,
                    data
                });
            }
        },
        name: 'updateTodo'
    }),
    graphql(TODO_DELETE_MUTATION, {
        options: {
            update: (proxy,{ data: { deleteTodo } }) => {
                const data = proxy.readQuery({
                    query: TODOS_QUERY
                });

                const todoIndex = data.todos.findIndex(todo => todo.id === deleteTodo.id);

                data.todos.splice(todoIndex, 1);

                proxy.writeQuery({
                    query: TODOS_QUERY,
                    data
                });
            }
        },
        name: 'deleteTodo'
    })
)(Todos);
