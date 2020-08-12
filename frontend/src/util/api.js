import axios from 'axios';
import { API_URL, ADMIN_URL, SUFFICE_EMPLOYEE, SUFFICE_EMPLOYEES, SUFFICE_LOGIN, SUFFICE_LOGOUT } from './constants';

export const signInAdmin = async ({ email, password }) => {
  const res = await axios.post(`${API_URL}/${ADMIN_URL}/${SUFFICE_LOGIN}`, { email, password });
  if (res && res.data && res.data.admin) {
    localStorage.setItem('adminObject', JSON.stringify(res.data.admin));
  }
};

export const checkAuthenticatedAdminApi = () => {
  return JSON.parse(localStorage.getItem('adminObject'));
};

export const logoutAdmin = async () => {
  const res = await axios.get(`${API_URL}/${ADMIN_URL}/${SUFFICE_LOGOUT}`);
  if (res && res.data && res.data.message === 'ok') {
    localStorage.setItem('adminObject', '');
  }
};

export const loadEmployeeListApi = async () => {
  const res = await axios.get(`${API_URL}/${ADMIN_URL}/${SUFFICE_EMPLOYEES}`);

  if (res && res.data) {
    return res.data;
  }

  return [];
};

export const addEmployeeApi = async ({ email, password, fullname, department, title }) => {
  return await axios.post(`${API_URL}/${ADMIN_URL}/${SUFFICE_EMPLOYEE}`, {
    email,
    password,
    fullname,
    department,
    title,
  });
};

export const deleteEmployeeApi = async id => {
  return await axios.delete(`${API_URL}/${ADMIN_URL}/${SUFFICE_EMPLOYEE}/${id}`);
};
