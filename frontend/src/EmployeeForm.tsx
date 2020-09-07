import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import {
    FormControl,
    Label,
    RoundNavIcon,
    Select
} from "./styledComponents";
import { ValidatedInputs, } from "./ValidatedInputs";
import { ReactComponent as CloseIcon } from "./assets/times-solid.svg";
import SpinnerButton from "./SpinnerButton";

const gql = require("graphql-tag");

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
      margin: 0 2em 0 0;
  }
`;
export const EmployeeFormContainer: any = styled.form``;
const ADD_EMPLOYEE = gql`
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

const EmployeeForm = props => {
    const { state, dispatch } = useContext(AppContext);
    const clientRef = useRef<HTMLDivElement>(null);
    const [addEmployee] = useMutation(ADD_EMPLOYEE, {
        onCompleted(response) {
            dispatch({
                type: "TOGGLE_MODAL",
                data: {},
            });
            dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `success`, message: `Added ${response.addEmployee.email} employee` } });
            props.refetchEmployees()
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
    const submitForm = e => {
        e.stopPropagation();
        e.preventDefault();
        addEmployee({ variables: { employee: { ...state.employeeForm, id: props.updateemployee } } });
    };
    return (
        <>
            <section>
                <EmployeeFormContainer onSubmit={submitForm}>
                    <FormHeader>
                        <h2>{props.updateemployee ? `Update` : `New`} Employee</h2>
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
                            form_to_set="employeeForm"
                            name="email"
                            validates="email"
                            defaultValue={
                                state.employeeForm.email ? state.employeeForm.email : ""
                            }
                            ref={clientRef}
                            id="email"
                            type="text"
                            required
                        />
                        <Label htmlFor="email">email</Label>
                    </FormControl>
                    <FormControl>
                        <ValidatedInputs
                            form_to_set="employeeForm"
                            name="name"
                            validates="name"
                            defaultValue={state.employeeForm.name}
                            id="name"
                            type="text"
                            required
                        />
                        <Label htmlFor="name">Name</Label>
                    </FormControl>
                    <FormControl>
                        <Label htmlFor="role">Employee role</Label>
                        <Select
                            id="role"
                            name="role"
                            onChange={e => {
                                dispatch({
                                    type: 'SET_FORM',
                                    data: { form_to_set: 'employeeForm', field: "role", value: e.target.value }
                                })
                            }
                            }
                        >
                            {["user", "admin"].map(role => (
                                <option key={role} value={role}>{role}</option>
                            )
                            )}
                        </Select>
                    </FormControl>
                    <SpinnerButton>
                        Submit
                    </SpinnerButton>
                </EmployeeFormContainer>
            </section>
        </>
    );
}
export default EmployeeForm;
