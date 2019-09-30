import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../actions/userActions'
import { dateRenderer } from "../../utils/dateutil";

class Employees extends Component {
    componentDidMount = () => {
        this.props.getUsers();
    }

    onDeleteBtnClick = user => {
        this.props.deleteUser(user._id);
    }

    onEditBtnClick = user => {
        this.props.history.push("/admin/add_employees", { user });
    }
    render() {
        const { users } = this.props;
        return (
            <>
                <nav>
                    <div className="nav-wrapper">
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/admin/add_employees" className="waves-effect btn white black-text">Add Employee</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className="container valign-wrapper">
                    <div style={{ width: "100%" }} className="row">
                        <div className="col s12 center-align">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created On</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user =>
                                        <tr key={user.email}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{dateRenderer(user.date)}</td>
                                            <td>
                                                <button className="normalize-btn" onClick={() => this.onEditBtnClick(user)} ><i className="material-icons black-text">edit</i></button>
                                                <button className="normalize-btn" onClick={() => this.onDeleteBtnClick(user)} style={{ marginLeft: '1rem' }}><i className="material-icons black-text">delete</i></button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Employees.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ users: state.users.users });

export default connect(mapStateToProps, { getUsers, deleteUser })(withRouter(Employees));