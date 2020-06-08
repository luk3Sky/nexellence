import React from 'react';

import TeacherForm from './TeacherForm';

const teacherFormWrapper = (props) => {
    let refs;
    const saveHandler = () => {
        refs.form.save();
    };

    const savedHandler = () => {
        window.location.hash = `#teacher/${props.teacher.id}`;
    };

    return (
        <div className="slds-m-around--medium">
            <TeacherForm ref="form" teacher={props.teacher} onSaved={savedHandler} />
            <button
                type="button"
                className="slds-button slds-button--neutral slds-button--brand slds-m-around--small"
                onClick={saveHandler}
            >
                Save
            </button>
        </div>
    );
};

export default teacherFormWrapper;
