import React, { useState } from 'react';
import { Switch, Tabs } from 'antd';
import EmployeeTab from './Components/EmployeeTab';
import EmployeeFeedbackTab from './Components/EmployeeFeedbackTab';

import './App.css';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

function getAdminTabs() {
    return (
    <Tabs type="card">
        <TabPane tab="Employees" key="1">
            <EmployeeTab/>
        </TabPane>
        <TabPane tab="Performance Review" key="2">
            <div className='message-under-construction'>This tab is under construction. It should allow the Admin to enter different feedback form templates.</div>
        </TabPane>
    </Tabs>);
}

function getEmployeeTabs() {
    return (
    <Tabs type="card">
        <TabPane tab="Performance Review" key="1">
            <EmployeeFeedbackTab/>
        </TabPane>
    </Tabs>);
}

function App() {
    // Assumption: the role will be coming from the authentication response
    // after a successful login
    const [adminState, setAdminState] = useState(true);

    const onRoleChange = (checked) => {
        setAdminState(checked);
    }

    return (
        <React.Fragment>
        <div id='mockRoleSwitch' className='switch-role'>
            <p class='label-header'>Welcome! Click to view Admin or Employee mode:</p>
            <Switch
                checkedChildren="Admin"
                unCheckedChildren="Non-admin"
                onChange={onRoleChange}
                defaultChecked />
        </div>
        <div id='employeeFeedbackApp'>
            {
                adminState ? getAdminTabs() : getEmployeeTabs()
            }
        </div>
        </React.Fragment>
    );
}

export default App;
