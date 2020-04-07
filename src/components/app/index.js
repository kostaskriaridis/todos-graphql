import React, { Fragment } from 'react';
import Form from '../form';
import Todos from '../todos';
import {
    useTodos,
    useCreateMutation,
    useUpdateMutation,
    useDeleteMutation
} from './hooks';

export default function App() {
    const { loading, error, todos } = useTodos();
    const handleCreateTodo = useCreateMutation();
    const handleUpdateTodo = useUpdateMutation();
    const handleDeleteTodo = useDeleteMutation();

    return (
        <Fragment>
            <Form
                disabled={loading || Boolean(error)}
                onSubmit={handleCreateTodo} />
            <Todos
                loading={loading}
                error={error}
                todos={todos}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo} />
        </Fragment>
    );
}
