import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentForm from './StudentForm';

class StudentFormWindow extends Component {
    saveHandler() {
        this.refs.form.save();
    }

    render() {
        const { onCancel, onSaved } = this.props;
        return (
            <div>
                <div
                    aria-hidden="false"
                    role="dialog"
                    className="slds-modal slds-fade-in-open"
                >
                    <div className="slds-modal__container">
                        <div className="slds-modal__header">
                            <h2 className="slds-text-heading--medium">
                                New Student
                            </h2>
                            <button
                                className="slds-button slds-modal__close"
                                type="button"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="slds-button__icon slds-button__icon--inverse slds-button__icon--large"
                                />
                                <span className="slds-assistive-text">Close</span>
                            </button>
                        </div>
                        <div className="slds-modal__content">
                            <StudentForm ref="form" onSaved={onSaved} />
                        </div>

                        <div className="slds-modal__footer">
                            <button
                                className="slds-button slds-button--neutral"
                                onClick={onCancel}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="slds-button slds-button--neutral slds-button--brand"
                                onClick={this.saveHandler}
                                type="button"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="slds-modal-backdrop slds-modal-backdrop--open" />
            </div>
        );
    }
}

StudentFormWindow.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSaved: PropTypes.func.isRequired
};

export default StudentFormWindow;
