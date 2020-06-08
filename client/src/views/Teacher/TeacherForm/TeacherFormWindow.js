import React from 'react';

import TeacherForm from './TeacherForm';

const teacherFormWindow = (props) => {
    let refs;
    const saveHandler = () => {
        refs.form.save();
    };

    return (
        <div>
            <div
                aria-hidden="false"
                role="dialog"
                className="slds-modal slds-fade-in-open"
            >
                <div className="slds-modal__container">
                    <div className="slds-modal__header">
                        <h2 className="slds-text-heading--medium">New Teacher</h2>
                        <button
                            type="button"
                            className="slds-button slds-modal__close"
                        >
                            <svg
                                aria-hidden="true"
                                className="slds-button__icon slds-button__icon--inverse slds-button__icon--large"
                            />
                            <span className="slds-assistive-text">Close</span>
                        </button>
                    </div>
                    <div className="slds-modal__content">
                        <TeacherForm ref="form" onSaved={props.onSaved} />
                    </div>

                    <div className="slds-modal__footer">
                        <button
                            type="button"
                            className="slds-button slds-button--neutral"
                            onClick={props.onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="slds-button slds-button--neutral slds-button--brand"
                            onClick={saveHandler}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <div className="slds-modal-backdrop slds-modal-backdrop--open" />
        </div>
    );
};

export default teacherFormWindow;
