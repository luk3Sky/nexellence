import React, { Component } from 'react';

import * as CourseService from 'services/CourseService';
import * as PeriodService from 'services/PeriodService';
import * as TeacherService from 'services/TeacherService';

import ComboBox from 'components/ComboBox/ComboBox';

class CourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            periods: [],
            teachers: []
        };
    }

    componentDidMount() {
        PeriodService.findAll().then((periods) => this.setState({ periods }));
        TeacherService.findAll().then((teachers) => this.setState({ teachers }));
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(props) {
        const { course } = props;
        this.setState({ course });
    }

    codeChangeHandler(event) {
        const { course } = this.state;
        course.code = event.target.value;
        this.setState({ course });
    }

    nameChangeHandler(event) {
        const { course } = this.state;
        course.name = event.target.value;
        this.setState({ course });
    }

    periodChangeHandler(index, value) {
        const { course } = this.state;
        course.period_id = value;
        this.setState({ course });
    }

    teacherChangeHandler(index, value) {
        const { course } = this.state;
        course.teacher_id = value;
        this.setState({ course });
    }

    creditsChangeHandler(event) {
        const { course } = this.state;
        course.credits = event.target.value;
        this.setState({ course });
    }

    save() {
        const saveItem = this.state.course.id
            ? CourseService.updateItem
            : CourseService.createItem;
        saveItem(this.state.course).then((savedCourse) => {
            if (this.props.onSaved) this.props.onSaved(savedCourse);
        });
    }

    render() {
        const { course } = this.state;
        return (
            <div className="slds-form--stacked slds-grid slds-wrap">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Code
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={course.code}
                                onChange={this.codeChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Name
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={course.name}
                                onChange={this.nameChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Teacher
                        </label>
                        <div className="slds-form-element__control">
                            <ComboBox
                                data={this.state.teachers}
                                value={course.teacher_id}
                                onChange={this.teacherChangeHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Period
                        </label>
                        <div className="slds-form-element__control">
                            <ComboBox
                                data={this.state.periods}
                                value={course.period_id}
                                onChange={this.periodChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Credits
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={course.credits}
                                onChange={this.creditsChangeHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseForm;
