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