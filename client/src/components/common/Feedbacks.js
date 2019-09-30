import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getFeedbacks, deleteFeedback } from '../../actions/feedbackActions'
import { dateRenderer } from '../../utils/dateutil';

class Feedbacks extends Component {
    state = {};

    componentDidMount = () => {
        this.props.getFeedbacks();
    }

    onDeleteBtnClick = feedback => {
        this.props.deleteFeedback(feedback._id);
    }

    onViewBtnClick = feedback => {
        this.props.history.push("/admin/add_feedback", { feedback });
    }

    render() {
        const { feedbacks, auth } = this.props;
        const isAdmin = auth.user.role === 'admin'
        return (
            <>
                <nav>
                    <div className="nav-wrapper">
                        <ul className="left hide-on-med-and-down">
                            <li><a href="#test1">View All</a></li>
                            <li><a href="#test4">View Completed</a></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            {isAdmin && <li><Link to="/admin/add_feedback" className="waves-effect btn white black-text">Add Feedback</Link></li>}
                        </ul>
                    </div>
                </nav>
                <div className="container valign-wrapper">
                    <div style={{ width: "100%" }} className="row">
                        <div className="col s12 center-align">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Feedback For</th>
                                        <th>Feedback By</th>
                                        <th>Comments</th>
                                        <th>Created On</th>
                                        <th>Submitted On</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbacks.map(e =>
                                        <tr key={e._id}>
                                            <td>{e.feedbackToName}</td>
                                            <td>{e.feedbackByName}</td>
                                            <td>{e.comments}</td>
                                            <td>{dateRenderer(e.createdOn)}</td>
                                            <td>{dateRenderer(e.submittedOn)}</td>
                                            <td>
                                                <a href="#" onClick={() => this.onViewBtnClick(e)}><i className="material-icons black-text">remove_red_eye</i></a>
                                                <button className="normalize-btn" onClick={() => this.onDeleteBtnClick(e)} style={{ marginLeft: '1rem', cursor: 'pointer' }}><i className="material-icons black-text">delete</i></button>
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

Feedbacks.propTypes = {
    feedbacks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    feedbacks: state.feedback.feedbacks,
    auth: state.auth,
});

export default connect(mapStateToProps, { getFeedbacks, deleteFeedback })(withRouter(Feedbacks));