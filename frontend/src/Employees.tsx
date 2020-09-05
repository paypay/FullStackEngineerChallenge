import React, { useContext, useState, useEffect } from 'react';

import AuthService from './AuthService';

import { IWelcomWrap } from './types';
import withAuth from './withAuth';

import styled from 'styled-components/macro';

const Auth = AuthService.getInstance();

const EmployeeList: React.FC<IWelcomWrap> = (props: IWelcomWrap) => {

    return (
        <>
            <h2>{`Employees`}</h2>

        </>
    );
};
export default withAuth(EmployeeList);