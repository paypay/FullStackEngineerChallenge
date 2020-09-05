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
const DESTROY_INVOICE = gql`
    mutation destroyInvoice($id: String) {
        destroyInvoice(id: $id) {
            success
        }
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
    const [destroyInvoice] = useMutation(DESTROY_INVOICE, {
        onCompleted(e) {
            console.log('completete', e);
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
            <h2>{`Employees`}</h2>
            {!!data
                && !!data.employees
                && data.employees.length > 0
                && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>CreatedAt</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {data.employees.map((employee, index) => (
                                <tr key={employee.id}>
                                    <td>{employee.email}</td>
                                    <td>{employee.name}</td>
                                    <td
                                        onClick={(e) => {
                                        }}
                                    >
                                        {employee.role}
                                    </td>
                                    <td
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            destroyInvoice({ variables: employee.id });
                                        }}
                                    >
                                        <SpinnerButton>
                                            Delete
									</SpinnerButton>
                                    </td>

                                    <td>{moment(employee.createdAt / 1000).format("YYYY.MM.DD")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    );
};
export default withAuth(EmployeeList);