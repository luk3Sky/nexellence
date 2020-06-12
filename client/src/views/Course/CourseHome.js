/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import * as CourseService from 'services/CourseService';
import * as PeriodService from 'services/PeriodService';
import settings from 'services/config';

import { HomeHeader } from 'components/Headers/PageHeader';

import CourseList from './CourseList';
import CourseFormWindow from './CourseForm/CourseFormWindow';

class CourseHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            periods: [],
            periodId: settings.currentPeriod
        };
    }

    componentDidMount() {
        PeriodService.findAll().then((periods) => this.setState({ periods }));
        CourseService.findAll({ periodId: this.state.periodId }).then((courses) =>
            this.setState({ courses })
        );
    }

    editHandler = (data) => {
        window.location.hash = `#course/${data.id}/edit`;
    };

    viewChangeHandler(index, periodId, label) {
        CourseService.findAll({ periodId }).then((courses) =>
            this.setState({ periodId, courses })
        );
    }

    newHandler() {
        this.setState({ addingCourse: true });
    }

    savedHandler(course) {
        this.setState({ addingCourse: false });
        window.location.hash = `#course/${course.id}`;
    }

    cancelHandler() {
        this.setState({ addingCourse: false });
    }

    render() {
        return (
            <div>
                <HomeHeader
                    type="Courses"
                    title="Current Courses"
                    newLabel="New Course"
                    actions={[{ value: 'new', label: 'New Course' }]}
                    itemCount={this.state.courses.length}
                    viewId={this.state.periodId}
                    views={this.state.periods}
                    onViewChange={this.viewChangeHandler}
                    onNew={this.newHandler}
                />
                <CourseList courses={this.state.courses} />
                {this.state.addingCourse ? (
                    <CourseFormWindow
                        onSaved={this.savedHandler}
                        onCancel={this.cancelHandler}
                    />
                ) : null}
            </div>
        );
    }
}

export default CourseHome;