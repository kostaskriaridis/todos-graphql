import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Form from '../form';
import Todos from '../todos';
import {
    useCreateMutation,
    useUpdateMutation,
    useDeleteMutation
} from './hooks';
import { TODOS_QUERY } from './query';

export default function App() {
    const { loading, error, data } = useQuery(TODOS_QUERY);
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
                todos={data ? data.todos : []}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo} />
        </Fragment>
    );
}
