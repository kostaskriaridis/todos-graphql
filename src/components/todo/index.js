import React, { PureComponent } from 'react';
import classNames from 'classnames';
import InputUpdate from '../common/input-update';
import './todo.css';

export default class Todo extends PureComponent {
    render() {
        const { completed, text } = this.props;
        const todoClass = classNames('todo', {
            todo_completed: completed
        });

        return (
            <li className={todoClass}>
                <input
                    type='checkbox'
                    name='completed'
                    checked={completed}
                    onChange={this.handleToggleTodo} />
                <InputUpdate
                    className='todo__text'
                    name='text'
                    value={text}
                    onChangeValue={this.handleUpdateTodoText} />
                <button onClick={this.handleDeleteTodo}>x</button>
            </li>
        );
    }

    handleUpdateTodoText = ({ name, value }) => {
        const { id, completed, onUpdateTodo } = this.props;

        onUpdateTodo(id, {
            completed,
            text: value
        });
    };

    handleToggleTodo = event => {
        const { id, text, onUpdateTodo } = this.props;

        onUpdateTodo(id, {
            text,
            completed: event.target.checked
        });
    };

    handleDeleteTodo = () => {
        this.props.onDeleteTodo(this.props.id);
    };
}
