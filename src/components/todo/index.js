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
                    onChangeValue={this.handleUpdateTodo} />
                <button onClick={this.handleDeleteTodo}>x</button>
            </li>
        );
    }

    handleUpdateTodo = ({ name, value }) => {
        this.props.onUpdateTodo(this.props.id, name, value);
    };

    handleToggleTodo = event => {
        const { name, checked } = event.target;

        this.props.onUpdateTodo(this.props.id, name, checked);
    };

    handleDeleteTodo = () => {
        this.props.onDeleteTodo(this.props.id);
    };
}
