import React from 'react';
import { Link } from "react-router-dom";

const AdminNavMenu = () => {
    return (
        <>
            <li>
                <Link
                    to="/admin/employees"
                    className="col s5 left black-text"
                >
                    Employees
                </Link>
            </li>
            <li>
                <Link
                    to="/admin/feedbacks"
                    className="col s5 left black-text"
                >
                    Feedbacks
                </Link>
            </li>
        </>
    );
};

export default AdminNavMenu;