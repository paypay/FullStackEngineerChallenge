import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AdminNavMenu from "./AdminNavMenu";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user, isAuthenticated } = this.props.auth
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {user && user.role === 'admin' && <AdminNavMenu />}
              {isAuthenticated && <li>
                <div
                  onClick={this.onLogout}
                  className="col s5 right black-text logout"
                >
                  Logout
                </div>
              </li>}
            </ul>
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo left black-text"
            >
              <i className="material-icons">code</i>
              PayPay
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
