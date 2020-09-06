import React, { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
    Table
} from './styledComponents';
import { IWelcomWrap } from './types';
import withAuth from './withAuth';
import moment from 'moment';
import { AppContext } from './AppProvider';
import SpinnerButton from './SpinnerButton';

const GET_EMPLOYEES = gql`
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
const DESTROY_EMPLOYEE = gql`
    mutation destroyEmployee($id: ID) {
        destroyEmployee(id: $id )
    }
`;
const EmployeeList: React.FC<IWelcomWrap> = (props: IWelcomWrap) => {
    const { state, dispatch } = useContext(AppContext);
    const {
        loading, error, data, refetch, networkStatus,
    } = useQuery(GET_EMPLOYEES, {
        onCompleted(res) {
            console.log('completete', res);
        }
    })
    const [destroyEmployee, { loading: mutationLoading }] = useMutation(DESTROY_EMPLOYEE, {
        onCompleted(result) {
            dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `success`, message: `Employee ${result.destroyEmployee} destroyed` } });
            console.log('complete', result);
            refetch();
        },
        onError(e) {
            console.log('error', e);
        },
    });
    return (
        <>
            <h2>{`Employees`}</h2>
            {!!data
                && !!data.employees
                && data.employees.length > 0
                && (
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>CreatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.employees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.id}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.role}</td>
                                    <td>{moment(Number(employee.createdAt)).format("YYYY-MM-DD")}</td>
                                    <td
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            destroyEmployee({
                                                variables: {
                                                    id: employee.id
                                                }
                                            });
                                        }}
                                    >
                                        <SpinnerButton loading={mutationLoading}>
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
export default withAuth(EmployeeList);