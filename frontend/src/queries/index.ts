import { gql } from 'apollo-boost';
export const GET_EMPLOYEES = gql`
{
    employees {
        id
        email
        name
        role
        password
        createdAt
        verifiedAt
    }
}
`;
export const GET_FEEDBACKS = gql`
{
    feedbacks {
        id
        text
        review {
            id
            score
        }
        employee {
            id
            name
            email
        }
        createdAt
    }
}
`;