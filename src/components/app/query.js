import gql from 'graphql-tag';

export const TODOS_QUERY = gql`
    query TodosQuery {
        todos {
            id
            text
            completed
        }
    }
`;

export const TODO_CREATE_MUTATION = gql`
    mutation TodoCreateMutation($text: String!) {
        createTodo(text: $text) {
            id
            text
            completed
        }
    }
`;

export const TODO_UPDATE_MUTATION = gql`
    mutation TodoUpdateMutation($todoId: ID!, $text: String, $completed: Boolean) {
        updateTodo(id: $todoId, text: $text, completed: $completed) {
            id
            text
            completed
        }
    }
`;

export const TODO_DELETE_MUTATION = gql`
    mutation TodoDeleteMutation($todoId: ID!) {
        deleteTodo(id: $todoId) {
            id
        }
    }
`;
