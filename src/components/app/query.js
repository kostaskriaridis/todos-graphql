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
    mutation TodoUpdateMutation($id: ID!, $text: String, $completed: Boolean) {
        updateTodo(id: $id, text: $text, completed: $completed) {
            id
            text
            completed
        }
    }
`;

export const TODO_DELETE_MUTATION = gql`
    mutation TodoDeleteMutation($id: ID!) {
        deleteTodo(id: $id) {
            id
        }
    }
`;
