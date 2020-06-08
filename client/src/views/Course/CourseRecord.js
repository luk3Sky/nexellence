/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import moment from 'moment';

import * as CourseService from 'services/CourseService';

import { RecordHeader, HeaderField } from 'components/Headers/PageHeader';

import CourseView from './CourseView';
import CourseEnrollmentCard from './CourseEnrollmentCard';

export default class CourseRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {}
        };
    }

    componentDidMount() {
        this.getCourse(this.props.params.courseId);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(props) {
        this.getCourse(props.params.courseId);
    }

    getCourse(id) {
        CourseService.findById(id).then((course) => this.setState({ course }));
    }

    deleteHandler() {
        CourseService.deleteItem(this.state.course.id).then(
            // eslint-disable-next-line no-return-assign
            () => (window.location.hash = 'courses')
        );
    }

    editHandler() {
        window.location.hash = `#course/${this.state.course.id}/edit`;
    }

    render() {
        return (
            <div>
                <RecordHeader
                    type="Course"
                    icon="orders"
                    title={this.state.course.name}
                    onEdit={this.editHandler}
                    onDelete={this.deleteHandler}
                >
                    <HeaderField label="Code" value={this.state.course.code} />
                    <HeaderField
                        label="Period"
                        value={this.state.course.period_name}
                    />
                    <HeaderField label="Credits" value={this.state.course.credits} />
                </RecordHeader>

                {React.cloneElement(this.props.children, {
                    course: this.state.course
                })}
            </div>
        );
    }
}
