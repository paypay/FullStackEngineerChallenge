import React, { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import AuthService from './AuthService';
import { gql } from 'apollo-boost';
import {
    Table
} from './styledComponents';
import { IWelcomWrap } from './types';
import withAuth from './withAuth';
import moment from 'moment';
import { AppContext } from './AppProvider';
import SpinnerButton from './SpinnerButton';

const GET_REVIEWS = gql`
{
    reviews {
        id
        score
        employee {
            email
        }
        createdAt
    }
}
`;
const DESTROY_REVIEW = gql`
    mutation destroyReview($id: String) {
        destroyReview(id: $id) {
            success
        }
    }
`;
const ReviewList: React.FC<IWelcomWrap> = (props: IWelcomWrap) => {
    const { state, dispatch } = useContext(AppContext);
    const {
        loading, error, data, refetch, networkStatus,
    } = useQuery(GET_REVIEWS, {
        // onCompleted(res) {
        //     console.log('completete', res);
        // }
    })
    const [destroyReview] = useMutation(DESTROY_REVIEW, {
        onCompleted(e) {
            // console.log('completete', e);
            // setStaleObject()
            refetch();
        },
        onError(e) {
            console.log('error', e);
            // setStaleObject()
            // refetch();
        },
    });
    return (
        <>
            <h2>{`Reviews`}</h2>
            {!!data
                && !!data.reviews
                && data.reviews.length > 0
                && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Employee</th>
                                <th>CreatedAt</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {data.reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.score}</td>
                                    <td>{review.employee && review.employee.email}</td>
                                    <td>{moment(review.createdAt / 100).format("YYYY.MM.DD")}</td>
                                    <td
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            destroyReview({ variables: review.id });
                                        }}
                                    >
                                        <SpinnerButton>
                                            Delete
									</SpinnerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    );
};
export default withAuth(ReviewList);