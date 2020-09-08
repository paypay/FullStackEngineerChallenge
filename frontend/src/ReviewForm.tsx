import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import {
    FormControl,
    Label,
    RoundNavIcon,
    Select,
    FormHeader,
    Button
} from "./styledComponents";
import { ValidatedInputs, } from "./ValidatedInputs";
import { ReactComponent as CloseIcon } from "./assets/times-solid.svg";
import SpinnerButton from "./SpinnerButton";
import { GET_EMPLOYEES } from './queries'

const gql = require("graphql-tag");

export const ReviewFormContainer: any = styled.form``;
const ADD_REVIEW = gql`
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
const ADD_FEEDBACK = gql`
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

const ReviewForm = props => {
    const { state, dispatch } = useContext(AppContext);
    // const selectRef = useRef(null)
    const { loading, error, data, refetch, } = useQuery(GET_EMPLOYEES, {
        // onCompleted(res) {
        //     console.log('completete', res);
        // }
    })
    const [addReview, { loading: addMutationLoading }] = useMutation(ADD_REVIEW, {
        onCompleted(response) {
            dispatch({
                type: "TOGGLE_MODAL",
                data: {},
            });
            dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `success`, message: `Added ${response.addReview.email} review` } });
            props.refetchReviews()
        }, onError(e) {
            dispatch({
                type: "TOGGLE_TOAST",
                data: {
                    open: true,
                    type: "danger",
                    message: JSON.stringify(e),
                },
            });
        }
    });
    const [addFeedback, { loading: addFeedbackMutationLoading }] = useMutation(ADD_FEEDBACK, {
        onCompleted(response) {
            console.log('response', response);
            dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `success`, message: `Added review ${response.addFeedback.id}` } });
            dispatch({
                type: 'UPDATE_FORM',
                data: { form_to_set: 'reviewForm', form_value: { ...state.reviewForm, feedbackText: "" } }
            })
            props.refetchReviews()
            props.feedbacksRefetch()
        }, onError(e) {
            console.log(e);
            dispatch({
                type: "TOGGLE_TOAST",
                data: {
                    open: true,
                    type: "danger",
                    message: JSON.stringify(e),
                },
            });
        }
    });
    const submitForm = e => {
        e.stopPropagation();
        e.preventDefault();
        state.reviewForm['score'] = Number(state.reviewForm['score'])
        addReview({ variables: { review: { ...state.reviewForm, id: props.updatereview } } });
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{JSON.stringify(error)}</p>;
    return (
        <>
            <section>
                <ReviewFormContainer onSubmit={submitForm}>
                    <FormHeader>
                        <h2>{props.updatereview && data.employees ? `Update review for ${data.employees.find(e => e.id === state.reviewForm.employee).name}` : `New Review`} </h2>
                        <RoundNavIcon
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch({
                                    type: "TOGGLE_MODAL",
                                    data: {},
                                })
                            }}
                        >
                            <CloseIcon />
                        </RoundNavIcon>
                    </FormHeader>
                    <FormControl>
                        <ValidatedInputs
                            form_to_set="reviewForm"
                            name="score"
                            validates="score"
                            ref={props.inputRef}
                            id="score"
                            type="number"
                            value={state.reviewForm.score}
                            required
                        />
                        <Label htmlFor="score">score</Label>
                    </FormControl>
                    {!!data
                        && !!data.employees
                        && data.employees.length > 0
                        && (
                            <FormControl>
                                <Label htmlFor="employee">Employee</Label>
                                <Select
                                    id="employee"
                                    name="employee"
                                    required
                                    value={state.reviewForm.employee}
                                    onChange={e => {
                                        dispatch({
                                            type: 'SET_FORM',
                                            data: { form_to_set: 'reviewForm', field: "employee", value: e.target.value }
                                        })
                                    }}>
                                    <option disabled value="">Select employee</option>
                                    {data.employees.map(employee => (
                                        <option
                                            key={employee.id}
                                            value={employee.id}>
                                            {employee.email}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    {props.updatereview && (
                        <>
                            {!!props.feedbacksData
                                && !!props.feedbacksData.feedbacks
                                && props.feedbacksData.feedbacks.length > 0
                                && props.feedbacksData.feedbacks.filter(feedback => feedback.review && feedback.review.id === props.updatereview).map(feedback => (
                                    <div key={feedback.id}>
                                        {`${feedback.employee.name} says: ${feedback.text}`}
                                    </div>
                                ))
                            }
                            <FormControl>
                                <ValidatedInputs
                                    form_to_set="reviewForm"
                                    name="feedbackText"
                                    validates="text"
                                    id="feedbackText"
                                    type="text"
                                    value={state.reviewForm.feedbackText}
                                    required
                                />
                                <Label htmlFor="feedbackText">feedbackText</Label>
                            </FormControl>
                            <SpinnerButton
                                spinning={addFeedbackMutationLoading}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    addFeedback({ variables: { feedback: { text: state.reviewForm.feedbackText, employee: state.employee.id, review: props.updatereview } } });
                                }}>
                                Add feedback to review
                                </SpinnerButton>
                        </>
                    )}
                    <SpinnerButton
                        spinning={addMutationLoading}
                    >
                        Submit
                    </SpinnerButton>
                </ReviewFormContainer>
            </section>
        </>
    );
}
export default ReviewForm;
