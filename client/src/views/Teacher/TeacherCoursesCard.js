import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Icons/Icons';
import * as CourseService from 'services/CourseService';
import DataGrid from 'components/DataGrid/DataGrid';

class TeacherCoursesCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(props) {
        this.getCourses(props.teacher.id);
    }

    viewAllHandler = (event) => {
        const { teacher } = this.props;
        this.getCourses(teacher.id);
        event.preventDefault();
    };

    getCourses = (teacherId, queryParams) => {
        if (teacherId) {
            CourseService.findByTeacher(teacherId, queryParams).then((courses) =>
                this.setState({ courses })
            );
        }
    };

    courseLinkHandler = (course) => {
        window.location.hash = `#course/${course.id}`;
    };

    render() {
        const { courses } = this.state;
        return (
            <div className="slds-card">
                <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="topic" size="small" />
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">
                                Courses
                            </h3>
                        </div>
                    </div>
                </header>

                <section className="slds-card__body">
                    <DataGrid data={courses} keyField="id">
                        <div header="Period" field="period_name" sortable />
                        <div
                            header="Code"
                            field="code"
                            sortable
                            onLink={this.courseLinkHandler}
                        />
                        <div
                            header="Name"
                            field="name"
                            sortable
                            onLink={this.courseLinkHandler}
                        />
                        <div
                            header="Credits"
                            field="credits"
                            sortable
                            textAlign="right"
                        />
                    </DataGrid>
                </section>
            </div>
        );
    }
}

TeacherCoursesCard.defaultProps = {
    teacher: {}
};

TeacherCoursesCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    teacher: PropTypes.object
};

export default TeacherCoursesCard;
