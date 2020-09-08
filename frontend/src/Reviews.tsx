import React, { useContext, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
    Table, Modal, Button
} from './styledComponents';
import { IWelcomWrap } from './types';
import withAuth from './withAuth';
import moment from 'moment';
import { AppContext } from './AppProvider';
import SpinnerButton from './SpinnerButton';
import ReviewForm from './ReviewForm';

const GET_REVIEWS = gql`
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
const DESTROY_REVIEW = gql`
    mutation destroyReview($id: ID) {
        destroyReview(id: $id) 
    }
`;
const ReviewList: React.FC<IWelcomWrap> = (props: IWelcomWrap) => {
    const { state, dispatch } = useContext(AppContext);
    const [updatereview, setupdatereview] = useState("")
    const inputRef = useRef<HTMLDivElement>(null);
    const {
        loading, error, data, refetch, networkStatus,
    } = useQuery(GET_REVIEWS, {
        // onCompleted(res) {
        //     console.log('completete', res);
        // }
    })
    const [destroyReview, { loading: deleteMutationLoading }] = useMutation(DESTROY_REVIEW, {
        onCompleted(e) {
            // console.log('completete', e);
            // setStaleObject()
            refetch();
        },
        onError(e) {
            console.log('error', e);
        },
    });
    return (
        <>
            <Modal isopen={state.modal.open}>
                <ReviewForm
                    updatereview={updatereview}
                    setupdatereview={setupdatereview}
                    refetchReviews={refetch}
                    {...{ inputRef }}
                />
            </Modal>
            <div className="d-flex justify-content-between">
                <h2>{`Reviews`}</h2>
                <Button
                    onClick={(e) => {
                        setupdatereview("")
                        inputRef.current && inputRef.current.focus();
                        dispatch({
                            type: 'TOGGLE_MODAL',
                            data: { open: true }
                        })
                        dispatch({
                            type: 'UPDATE_FORM',
                            data: { form_to_set: 'reviewForm', form_value: { score: 0.5, employee: "" } }
                        })
                    }}>New review</Button>
            </div>
            {!!data
                && !!data.reviews
                && data.reviews.length > 0
                && (
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Score</th>
                                <th>Employee</th>
                                <th>CreatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.id}</td>
                                    <td>{review.score}</td>
                                    <td>{review.employee && review.employee.email}</td>
                                    <td><pre>{moment(Number(review.createdAt)).format("YYYY-MM-DD - hh:mm:ss")}</pre></td>
                                    <td className="d-flex">
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setupdatereview(review.id)
                                                dispatch({
                                                    type: 'TOGGLE_MODAL',
                                                    data: { open: true }
                                                })
                                                dispatch({
                                                    type: 'UPDATE_FORM',
                                                    data: { form_to_set: 'reviewForm', form_value: { score: review.score, employee: review.employee ? review.employee.id : "", feedbackText: "" } }
                                                })
                                            }}>
                                            Edit
                                        </Button>
                                        <SpinnerButton
                                            spinning={deleteMutationLoading}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                destroyReview({
                                                    variables: {
                                                        id: review.id
                                                    }
                                                });
                                            }}
                                        >
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