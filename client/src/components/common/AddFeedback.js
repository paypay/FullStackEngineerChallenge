import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveFeedback, editFeedback } from '../../actions/feedbackActions'
import { getUsers } from '../../actions/userActions';

class AddFeedback extends Component {
    state = {};
    formRef = React.createRef();
    static getDerivedStateFromProps = (props, state) => {
        if (props.users.length > 0) {
            const options = {};
            props.users.forEach(user => {
                options[`${user.name} - ${user.email}`] = null;
            });
            const toElems = document.querySelectorAll('.autocomplete.to');
            window.M.Autocomplete.init(toElems, {
                data: options,
                onAutocomplete: (e) => {
                    AddFeedback.onAutoCompleteChange(e, 'feedbackToEmail')
                }
            });
            const fromElems = document.querySelectorAll('.autocomplete.from');
            window.M.Autocomplete.init(fromElems, {
                data: options,
                onAutocomplete: (e) => {
                    AddFeedback.onAutoCompleteChange(e, 'feedbackByEmail')
                }
            });
        }
        return null;
    }

    static onAutoCompleteChange = (e, fieldId) => {
        if (fieldId) {
            const mail = e.split('-')[1].trim();
            const element = document.getElementById(fieldId);
            element.value = mail;
        }
    };

    componentDidMount = () => {
        this.props.getUsers();
        const state = this.props.location.state;
        if (state && state.feedback) {
            this.setState({ feedback: state.feedback });
            this.loadFormData(state.feedback);
        }
    };

    loadFormData = feedback => {
        const formElement = this.formRef.current;
        [...formElement.elements].forEach(element => {
            console.log(element.name);
            if (element.name && feedback[element.name]) {
                element.value = feedback[element.name];
            }
            window.M.updateTextFields();
        });
    };

    validateForm = (formData) => {
        const error = {};
        const feedbackToEmail = formData.get('feedbackToEmail');
        const feedbackByEmail = formData.get('feedbackByEmail');

        if (!feedbackToEmail) {
            error['feedbackToEmail'] = 'To email can\'t be empty';
        }
        if (!feedbackByEmail) {
            error['feedbackByEmail'] = 'From email can\'t be empty';
        }

        return Object.keys(error).length ? error : null;
    };

    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // Validate form
        const error = this.validateForm(formData);
        if (error) {
            alert("Please fill the complete form");
            console.log(error);
            return;
        }

        const { auth } = this.props;

        const feedbackData = {
            feedbackToName: formData.get('feedbackToName').split('-')[0].trim(),
            feedbackToEmail: formData.get('feedbackToEmail'),
            feedbackByName: formData.get('feedbackByName').split('-')[0].trim(),
            feedbackByEmail: formData.get('feedbackByEmail'),
            notes: formData.get('notes'),
            comments: formData.get('comments'),
            requestedByName: auth.user.name,
            requestedByEmail: auth.user.email,
        };

        const {feedback} = this.state;
        if (feedback) {
            feedbackData.id = feedback._id;
            this.props.editFeedback(feedbackData, this.props.history);
        } else {
            this.props.saveFeedback(feedbackData, this.props.history);
        }
    }
    render() {
        return (
            <div className="container valign-wrapper">
                <form style={{ width: "50vw" }} className="row" onSubmit={this.onSubmit} ref={this.formRef}>
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">person</i>
                                <input type="text" className="autocomplete to" name="feedbackToName" onChange={this.onAutoCompleteChange} autocomplete="off" />
                                <label htmlFor="autocomplete-input">For Employee</label>
                            </div>
                            <input type="hidden" name="feedbackToEmail" id="feedbackToEmail" />
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">person</i>
                                <input type="text" className="autocomplete from" name="feedbackByName" onChange={this.onAutoCompleteChange} autocomplete="off" />
                                <label htmlFor="autocomplete-input">By Employee</label>
                            </div>
                            <input type="hidden" name="feedbackByEmail" id="feedbackByEmail" />
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">comments</i>
                                <textarea id="textarea1" className="materialize-textarea" name="notes"></textarea>
                                <label htmlFor="textarea1">Notes/Instruction</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">comments</i>
                                <textarea id="textarea1" className="materialize-textarea" name="comments"></textarea>
                                <label htmlFor="textarea1">Comments</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 center">
                                <button className="btn waves-effect waves-light" type="submit" >Submit
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

AddFeedback.propTypes = {
    saveFeedback: PropTypes.func.isRequired,
    editFeedback: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    feedback: state.feedback.feedbacks,
    users: state.users.users,
    auth: state.auth
});


export default connect(mapStateToProps, { saveFeedback, editFeedback, getUsers })(withRouter(AddFeedback));