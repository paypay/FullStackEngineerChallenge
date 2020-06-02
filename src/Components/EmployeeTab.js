import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Drawer, Form, Button, Col, Row, Select, DatePicker } from 'antd';

import '../App.css';
import 'antd/dist/antd.css';

const { Option } = Select;

// TODO: refactor later, repeating code
function EmployeeRow({ employee, index, deleteEmployee }) {
    const employeeName = employee.firstName + ' ' + employee.middleName + ' ' + employee.lastName;

    return (
        <div className="employee-row">
            {employeeName}
            <div>
                <Button
                    id='btnDeleteEmployee'
                    onClick={() => deleteEmployee(index)}>x</Button>
            </div>
        </div>
    );
}

function EmployeeTab() {
  const [employees, setEmployees] = useState([ // TODO: hardcoded, must come from server response via a GET method
    {
        firstName: 'Hermione',
        middleName: 'Jean',
        lastName: 'Granger',
    },
    {
        firstName: 'Minerva',
        middleName: '',
        lastName: 'McGonagal',
    },
    {
        firstName: 'Harry James',
        middleName: 'Evans',
        lastName: 'Potter',
    },
    {
        firstName: 'Rowena',
        middleName: '',
        lastName: 'Ravenclaw',
    }
  ]);

  ///////////////////
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const showDrawer = () => {
    setDrawerVisibility(true);
  }

  const onClose = () => {
    setDrawerVisibility(false);
  };

// TODO: reuse
//   const addEmployee = name => {
//       console.log('add employee ', name);
//     const newEmployeeList = [...employees,
//         {
//             firstName: name.firstName,
//             lastName: name.lastName
//         }];
//     setEmployees(newEmployeeList);
//   };

  const confirmationDialog = () => {
      // TODO: Add better Confirmation dialog
      if (window.confirm('Are you sure you want to delete this employee entry?')) {
        return true;
      } else {
        return false;
      }
  }

  const deleteEmployee = index => {
    if (confirmationDialog()) {
      const newEmployeeList = [...employees];
      newEmployeeList.splice(index, 1);
      setEmployees(newEmployeeList);
    }
  };

  return (
    <div className="employee-view">
      <p class='label-header'>Manage employees</p>
      <div className="employee-list">
        {employees.map((employee, index) => (
            <EmployeeRow
                key={index}
                index={index}
                employee={employee}
                deleteEmployee={deleteEmployee}
            />
        ))}
 
        <Button type="primary" onClick={showDrawer}>
            <PlusOutlined />New employee
        </Button>

        <Drawer
          title="Employee Details"
          width={720}
          onClose={onClose}
          visible={drawerVisibility}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
        
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="employeeId"
                  label="Employee ID"
                  rules={[
                    {
                      required: true,
                      message: 'please enter employee ID',
                    },
                  ]}
                >
                  <Input placeholder="Employee ID" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter last name' }]}
                >
                  <Input placeholder="Last name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="middleName"
                  label="Middle Name"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input placeholder="Middle name" />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                  name="employmentStatus"
                  label="Employment Status"
                  rules={[{ required: true, message: 'Please select employment status' }]}
                >
                  <Select placeholder="Please select employment status">
                    <Option value="permanent">Permanent</Option>
                    <Option value="temporary">Temporary</Option>
                    <Option value="probationary">Probationary</Option>
                    <Option value="parttime">Part Time</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="position"
                  label="Position"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                  <Select placeholder="Please select a position">
                    <Option value="engFrontend">Frontend Engineer</Option>
                    <Option value="engBackend">Backend Engineer</Option>
                    <Option value="engQa">QA Engineer</Option>
                    <Option value="devops">Dev Ops</Option>
                    <Option value="ux">UX Designer</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="hr">HR staff</Option>
                    <Option value="admin">Administrator</Option>
                    <Option value="sales">Salesperson</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="department"
                  label="Department"
                  rules={[{ required: true, message: 'Please choose the department' }]}
                >
                  <Select placeholder="Please choose a department">
                    <Option value="software">Software Solutions</Option>
                    <Option value="rnd">Research and Development</Option>
                    <Option value="networking">Networking</Option>
                    <Option value="hr">Human Resources</Option>
                    <Option value="admin">Administration</Option>
                    <Option value="sales">Sales</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="manager"
                  label="Manager"
                  rules={[{ required: true, message: 'Please choose the manager' }]}
                >
                  <Select placeholder="Please choose the manager">
                    <Option value="mcgonagall">Minerva McGonagall</Option>
                    <Option value="sprout">Pomona Sprout</Option>
                    <Option value="firenze">Firenze</Option>
                    <Option value="snape">Severus Snape</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="hiringDate"
                  label="Hiring Date"
                  rules={[{ required: true, message: 'Please choose the hiring date' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        
      </div>
    </div>
  );
}

export default EmployeeTab;
