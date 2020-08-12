import React, { memo, useEffect, useCallback, useState } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import {
  checkAuthenticatedAdmin,
  loadEmployeeList,
  addEmployeeRequest,
  deleteEmployeeRequest,
} from '../../redux/actions';
import { HOME, ADMIN_DASHBOARD, MANAGE_REVIEWS } from '../../util/constants';
import styles from './adminEmployees.module.scss';

const AdminEmployees = () => {
  const dispatch = useDispatch();

  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [fullname, changeFullname] = useState('');
  const [department, changeDepartment] = useState('');
  const [title, changeTitle] = useState('');

  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);
  const employeeList = useSelector(state => state.admin.employeeList);

  useEffect(() => {
    dispatch(checkAuthenticatedAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated === null) {
      // isAuthenticated is still being initialized
      return;
    }
    if (!isAuthenticated) {
      dispatch(push(`/${HOME}`));
    }

    // only load after credential has been checked
    dispatch(loadEmployeeList());
  }, [dispatch, isAuthenticated]);

  const goDashBoard = useCallback(() => {
    dispatch(push(`/${ADMIN_DASHBOARD}`));
  }, [dispatch]);

  const manageReviews = useCallback(() => {
    dispatch(push(`/${MANAGE_REVIEWS}`));
  }, [dispatch]);

  const deleteEmployee = useCallback(
    id => {
      if (window.confirm('Are you sure?')) {
        dispatch(deleteEmployeeRequest(id));
      }
    },
    [dispatch],
  );

  const addEmployee = useCallback(
    e => {
      e.preventDefault();
      if (!email || !password || !fullname || !department || !title) {
        return;
      }
      dispatch(addEmployeeRequest({ email, password, fullname, department, title }));
    },
    [email, password, fullname, department, title, dispatch],
  );

  const handleChangeEmail = useCallback(e => {
    changeEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback(e => {
    changePassword(e.target.value);
  }, []);

  const handleChangeFullname = useCallback(e => {
    changeFullname(e.target.value);
  }, []);

  const handleChangeDepartment = useCallback(e => {
    changeDepartment(e.target.value);
  }, []);

  const handleChangeTitle = useCallback(e => {
    changeTitle(e.target.value);
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Manage Employees</h1>
        <div className={styles.AppLink} onClick={manageReviews}>
          Manage Reviews
        </div>
        <div className={styles.AppLink} onClick={goDashBoard}>
          Admin Dashboard
        </div>
        <br />
        <h2>Add new Employee</h2>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
          </Form.Group>
          <Form.Group controlId="formFullname">
            <Form.Label>Full name</Form.Label>
            <Form.Control type="text" placeholder="Full name" value={fullname} onChange={handleChangeFullname} />
          </Form.Group>
          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" placeholder="Department" value={department} onChange={handleChangeDepartment} />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" value={title} onChange={handleChangeTitle} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={addEmployee}>
            Add
          </Button>
        </Form>
        <br />
        <h2>Employee List</h2>
        {employeeList.map((employee, index) => (
          <div key={employee.id}>
            {index + 1} - {employee.fullname} - [ View | Edit |
            <span className={styles.AppLink} onClick={() => deleteEmployee(employee.id)}>
              {' '}
              Delete{' '}
            </span>
            ]
          </div>
        ))}
      </header>
    </div>
  );
};

export default memo(AdminEmployees);
