import React from 'react';
import PropTypes from 'prop-types';

import StudentForm from './StudentForm';

const studentFormWrapper = (props, refs) => {
    const { student } = props;
    const saveHandler = () => {
        refs.form.save();
    };

    const savedHandler = () => {
        window.location.hash = `#student/${student.id}`;
    };

    return (
        <div className="slds-m-around--medium">
            <StudentForm ref="form" student={student} onSaved={savedHandler} />
            <button
                className="slds-button slds-button--neutral slds-button--brand slds-m-around--small"
                onClick={saveHandler}
                type="button"
            >
                Save
            </button>
        </div>
    );
};

studentFormWrapper.defaultProps = {
    student: {}
};

studentFormWrapper.propTypes = {
    student: {
        id: PropTypes.string.isRequired
    }
};

export default studentFormWrapper;
