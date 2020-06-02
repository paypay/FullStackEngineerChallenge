import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Drawer, Form, Button, Row, Layout, Slider, Checkbox } from 'antd';
import '../App.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

// TODO: refactor later, repeating code
function EmployeeRow({ employee, showDrawer }) {
  const employeeName = employee.firstName + ' ' + employee.middleName + ' ' + employee.lastName;

  return (
      <div className="employee-row">
          {employeeName}
          <div>
              <Button
                  id='btnReview'
                  onClick={showDrawer}>Give Feedback</Button>
          </div>
      </div>
  );
}

function EmployeeFeedbackTab() {

  // TODO: unify all state variables
  const [employees, setEmployees] = useState([ // TODO: hardcoded, must come from server response via a GET method
    {
      firstName: 'Albus Percival Wulfric Brian',
      middleName: 'Canard',
      lastName: 'Dumbledore',
    }
  ]);
  const [employeeName, setEmployeeName] = useState(employees[0]);

  const fullName = employeeName.firstName + ' ' + employeeName.middleName + ' ' + employeeName.lastName;
  const score = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  };

  // mock for now
  // const [inputJobKnowledge, setJobKnowledge] = useState(1);
  // const [inputWorkQuality, setWorkQuality] = useState(1);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  // TODO: unify all state variables

  const showDrawer = () => {
    setDrawerVisibility(true);
  }

  const onClose = () => {
    setDrawerVisibility(false);
  };

  const onSliderChange = () => {
    console.log('TODO');
  };

  const onConfirmation = () => {
    // TODO: mark the employee feedback for this employee as completed
    console.log('TODO');
  };

  return (
    <React.Fragment>

    <div className="employee-view">
      <p class='label-header'>Feedback is requested for the following:</p>
      <div className="employee-list">
        {employees.map((employee, index) => (
            <EmployeeRow
                key={index}
                index={index}
                employee={employee}
                showDrawer={showDrawer}
            />
        ))}

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

        <Layout>
            <Header>{fullName}</Header>
            <Layout>
                <Content>
                  <Form layout="vertical" hideRequiredMark>
                    <Row className='row-feedback'>

                        <Form.Item
                          className='feedback-item'
                          name="criteriaJobKnowledge"
                          label="Job Knowledge"
                          rules={[{ required: true, message: 'Please select an owner' }]}
                        >

                        <div className='rating-row'>
                          <div className='scale-label'>Did not meet expectations</div>
                          <Slider
                              className='slider-rating'
                              min={1}
                              max={5}
                              marks={score}
                              onChange={onSliderChange}
                              // value={typeof inputJobKnowledge === 'number' ? inputJobKnowledge : 0}
                            />
                            <div className='scale-label'>Exceeds expectations</div>
                        </div>
                        </Form.Item>
                        <Form.Item
                          className='feedback-item'
                          name="description"
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter constructive feedback and comments here',
                            },
                          ]}
                        >
                          <Input.TextArea
                            className='feedback-description' 
                            rows={4}
                            placeholder='Please enter constructive feedback and comments here' />
                        </Form.Item>
                    </Row>
                    
                    <Row className='row-feedback'>
                    <Form.Item
                          className='feedback-item'
                          name="criteriaWorkQuality"
                          label="Work Quality"
                        >

                        <div className='rating-row'>
                          <div className='scale-label'>Did not meet expectations</div>
                          <Slider
                              className='slider-rating'
                              min={1}
                              max={5}
                              marks={score}
                              onChange={onSliderChange}
                              // value={typeof inputWorkQuality === 'number' ? inputWorkQuality : 0}
                            />
                            <div className='scale-label'>Exceeds expectations</div>
                        </div>
                        </Form.Item>
                        <Form.Item
                          className='feedback-item'
                          name="description"
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter constructive feedback and comments here',
                            },
                          ]}
                        >
                          <Input.TextArea
                            className='feedback-description' 
                            rows={4}
                            placeholder='Please enter constructive feedback and comments here' />
                        </Form.Item>
                    </Row>

                    <Row className='row-feedback'>
                    <Form.Item
                          className='feedback-item'
                          name="criteriaInitiative"
                          label="Initiative"
                        >

                        <div className='rating-row'>
                          <div className='scale-label'>Did not meet expectations</div>
                          <Slider
                              className='slider-rating'
                              min={1}
                              max={5}
                              marks={score}
                              onChange={onSliderChange}
                              // value={typeof inputWorkQuality === 'number' ? inputWorkQuality : 0}
                            />
                            <div className='scale-label'>Exceeds expectations</div>
                        </div>
                        </Form.Item>
                        <Form.Item
                          className='feedback-item'
                          name="description"
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter constructive feedback and comments here',
                            },
                          ]}
                        >
                          <Input.TextArea
                            className='feedback-description' 
                            rows={4}
                            placeholder='Please enter constructive feedback and comments here' />
                        </Form.Item>
                    </Row>

                    <Row className='row-feedback'>
                    <Form.Item
                          className='feedback-item'
                          name="criteriaDependability"
                          label="Dependability"
                        >

                        <div className='rating-row'>
                          <div className='scale-label'>Did not meet expectations</div>
                          <Slider
                              className='slider-rating'
                              min={1}
                              max={5}
                              marks={score}
                              onChange={onSliderChange}
                              // value={typeof inputWorkQuality === 'number' ? inputWorkQuality : 0}
                            />
                            <div className='scale-label'>Exceeds expectations</div>
                        </div>
                        </Form.Item>
                        <Form.Item
                          className='feedback-item'
                          name="description"
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter constructive feedback and comments here',
                            },
                          ]}
                        >
                          <Input.TextArea
                            className='feedback-description' 
                            rows={4}
                            placeholder='Please enter constructive feedback and comments here' />
                        </Form.Item>
                    </Row>

                    <Row className='row-feedback'>
                        <Form.Item
                          className='feedback-item'
                          name="remarks"
                          label="Remarks"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter additional remarks not covered by the criteria above.',
                            },
                          ]}
                        >
                          <Input.TextArea
                            className='feedback-description' 
                            rows={4}
                            placeholder='Please enter additional remarks not covered by the criteria above.' />
                        </Form.Item>
                    </Row>

                    <Row className='row-feedback'>
                        <Form.Item
                          className='feedback-item'
                          name="confirmation"
                          label="Confirmation"
                          // TODO: fix rules
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please enter additional remarks not covered by the criteria above.',
                          //   },
                          // ]}
                        >
                          <Checkbox className='confirmCheckbox' onChange={onConfirmation}>I confirm that I have completed the feedback for this employee.</Checkbox>
                        </Form.Item>
                    </Row>
                  </Form>

                </Content>
            </Layout>
            <Footer>

            </Footer>
        </Layout>

        </Drawer>
        
      </div>
    </div>
    </React.Fragment>
  );
}

export default EmployeeFeedbackTab;
