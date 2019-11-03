import React, { Fragment, useState } from 'react';
import { graphql } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Form from '../form';
import Todos from '../todos';
import {
    useCreateMutation,
    useDeleteMutation,
    useUpdateMutation
} from './hooks';
import { TODOS_QUERY } from './query';

export default function App() {
    const { loading, error, data = { todos: [] } } = useQuery(TODOS_QUERY);
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
                todos={data.todos}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo} />
        </Fragment>
    );
}
