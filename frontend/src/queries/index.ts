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
export const ADD_REVIEW = gql`
    mutation addReview($review: ReviewData) {
        addReview(review: $review) {
            id
            score
            employee {
                id
                email
            }
            createdAt
        }
    }
`;
export const ADD_FEEDBACK = gql`
    mutation addFeedback($feedback: FeedbackData) {
        addFeedback(feedback: $feedback) {
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
export const ADD_EMPLOYEE = gql`
    mutation addEmployee($employee: EmployeeData) {
        addEmployee(employee: $employee) {
            id
            email
            name
            role
            createdAt
        }
    }
`;
export const LOGIN = gql`
    mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
        jwtToken
    }
  }
`;
export const GET_REVIEWS = gql`
{
    reviews {
        id
        score
        employee {
            id
            email
        }
        createdAt
    }
}
`;
export const DESTROY_REVIEW = gql`
    mutation destroyReview($id: ID) {
        destroyReview(id: $id) 
    }
`;
export const DESTROY_EMPLOYEE = gql`
    mutation destroyEmployee($id: ID) {
        destroyEmployee(id: $id )
    }
`;