import React, { Component, createRef } from 'react';

import CourseForm from './CourseForm';

class CourseFormWrapper extends Component {
    constructor(props) {
        super(props);
        this.form = createRef();
    }

    saveHandler() {
        this.form.current.save();
    }

    savedHandler() {
        window.location.hash = `#course/${this.props.course.id}`;
    }

    render() {
        return (
            <div className="slds-m-around--medium">
                <CourseForm
                    ref="form"
                    course={this.props.course}
                    onSaved={this.savedHandler}
                />
                <button
                    type="button"
                    className="slds-button slds-button--neutral slds-button--brand slds-m-around--small"
                    onClick={this.saveHandler}
                >
                    Save
                </button>
            </div>
        );
    }
}

export default CourseFormWrapper;
