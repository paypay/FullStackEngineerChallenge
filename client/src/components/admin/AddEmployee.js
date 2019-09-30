import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from "../../actions/authActions";
import { editUser } from "../../actions/userActions"
import PropTypes from 'prop-types';

class AddEmployee extends Component {
    state = {};
    formRef = React.createRef();

    componentDidMount() {
        window.M.AutoInit();
        const { user } = this.props.location.state;
        if (user) {
            this.populateForm(user);
            this.setState({ user });
        }
    }

    populateForm = user => {
        const formElement = this.formRef.current;
        [...formElement.elements].forEach(element => {
            console.log(element.name, user[element.name]);
            if (element.name && user[element.name] && element.name !== 'password') {
                element.value = user[element.name];
            }
            window.M.updateTextFields();
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password2: formData.get('password2'),
            role: formData.get('role')
        }
        if(this.state.user) {
            userData.id = this.state.user._id;
            this.props.editUser(userData, this.props.history);
        } else {
            this.props.registerUser(userData, this.props.history);
        }
    }
    render() {
        return (
            <div className="container valign-wrapper">
                <form style={{ width: "50vw" }} className="row" onSubmit={this.onSubmit} ref={this.formRef}>
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input type="text" name="name" />
                                <label for="name">Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input type="text" name="email" />
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input type="password" name="password" />
                                <label for="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input type="password" name="password2" />
                                <label for="password2">Confirm Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">recent_actors</i>
                                <select name="role">
                                    <option value="" disabled selected>Choose your option</option>
                                    <option value="admin">Admin</option>
                                    <option value="normal">Normal</option>
                                </select>
                                <label>Role</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 center">
                                <button className="btn waves-effect waves-light" type="submit">Submit
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                            <div className="input-field col s6 center">
                                <button className="btn waves-effect waves-light red darken-1">Cancel
                                <i className="material-icons right">cancel</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddEmployee.propTypes = {
    registerUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser, editUser }
)(withRouter(AddEmployee));