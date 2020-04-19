import React from 'react';

import StudentForm from './StudentForm';

const studentFormWrapper = (props, refs) => {
    const saveHandler = () => {
        refs.form.save();
    }

    const savedHandler = () => {
        window.location.hash = "#student/" + props.student.id;
    }

    return (
        <div className="slds-m-around--medium">
            <StudentForm ref="form" student={props.student} onSaved={savedHandler}/>
            <button className="slds-button slds-button--neutral slds-button--brand slds-m-around--small" onClick={saveHandler}>Save</button>
        </div>
    );
}

export default studentFormWrapper;