import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as EnrollmentService from 'services/EnrollmentService';
import { Icon, ButtonIcon } from 'components/Icons/Icons';
import settings from 'services/config';
import DataGrid from 'components/DataGrid/DataGrid';
import CourseEnrollmentWindow from 'views/Course/CourseEnrollmentWindow';

class StudentEnrollmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollments: [],
            period: 'current',
            addingEnrollment: false
        };
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(props) {
        const { student } = props;
        this.getEnrollments(student.id);
    }

    newEnrollmentHandler = () => {
        this.setState({ addingEnrollment: true });
    };

    newEnrollmentCancelHandler = () => {
        this.setState({ addingEnrollment: false });
    };

    newEnrollmentSelectedHandler = (course) => {
        const { student } = this.props;
        EnrollmentService.createItem({
            student_id: student.id,
            course_id: course.id
        })
            .then(() => {
                this.getEnrollments(student.id);
                this.setState({ addingEnrollment: false });
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                const event = new CustomEvent('notify', {
                    detail: 'Student already enrolled in this course'
                });
                document.dispatchEvent(event);
            });
    };

    viewAllHandler = (event) => {
        const { student } = this.props;
        this.getEnrollments(student.id, 'all');
        event.preventDefault();
    };

    viewCurrentHandler = (event) => {
        const { student } = this.props;
        this.getEnrollments(student.id, 'current');
        event.preventDefault();
    };

    courseLinkHandler = (enrollment) => {
        window.location.hash = `#course/${enrollment.course_id}`;
    };

    teacherLinkHandler = (enrollment) => {
        window.location.hash = `#teacher/${enrollment.teacher_id}`;
    };

    // eslint-disable-next-line no-unused-vars
    actionHandler = (data, index, value, label) => {
        const { student } = this.props;
        switch (index) {
            case 0:
                this.courseLinkHandler(data);
                break;
            case 1:
                this.teacherLinkHandler(data);
                break;
            case 2:
                EnrollmentService.deleteItem(data.id).then(() =>
                    this.getEnrollments(student.id)
                );
                break;
            default:
                break;
        }
        return null;
    };

    getEnrollments = (studentId, newPeriodState) => {
        const { period } = this.state;
        let params;
        if (
            (newPeriodState && newPeriodState === 'current') ||
            (!newPeriodState && period === 'current')
        ) {
            params = { periodId: settings.currentPeriod };
        }
        if (studentId) {
            EnrollmentService.findByStudent(studentId, params).then((enrollments) =>
                this.setState({
                    enrollments,
                    period: newPeriodState || period
                })
            );
        }
    };

    render() {
        const { addingEnrollment, enrollments, period } = this.state;

        return (
            <div className="slds-card">
                <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="orders" size="small" />
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">
                                Courses
                            </h3>
                        </div>
                    </div>
                    <div className="slds-no-flex">
                        <div className="slds-button-group">
                            <button
                                className="slds-button slds-button--neutral slds-button--small"
                                onClick={this.newEnrollmentHandler}
                                type="button"
                            >
                                New
                            </button>
                            <button
                                className="slds-button slds-button--icon-border-filled"
                                type="button"
                            >
                                <ButtonIcon name="down" />
                                <span className="slds-assistive-text">
                                    Show More
                                </span>
                            </button>
                        </div>
                    </div>
                </header>

                <section className="slds-card__body">
                    <DataGrid
                        data={enrollments}
                        keyField="id"
                        actions={['View Course', 'View Teacher', 'Delete']}
                        onAction={this.actionHandler}
                    >
                        <div
                            header="Code"
                            field="code"
                            onLink={this.courseLinkHandler}
                        />
                        <div
                            header="Name"
                            field="course_name"
                            onLink={this.courseLinkHandler}
                        />
                        <div header="Period" field="period_name" />
                        <div
                            header="Teacher"
                            field="teacher_name"
                            onLink={this.teacherLinkHandler}
                        />
                        <div header="Credits" field="credits" textAlign="right" />
                    </DataGrid>
                </section>
                {period === 'current' ? (
                    <footer className="slds-card__footer">
                        <button type="button" href="#" onClick={this.viewAllHandler}>
                            View All Periods
                        </button>
                    </footer>
                ) : (
                    <footer className="slds-card__footer">
                        <button
                            type="button"
                            href="#"
                            onClick={this.viewCurrentHandler}
                        >
                            View Current Period
                        </button>
                    </footer>
                )}
                {addingEnrollment ? (
                    <CourseEnrollmentWindow
                        onSelected={this.newEnrollmentSelectedHandler}
                        onCancel={this.newEnrollmentCancelHandler}
                    />
                ) : null}
            </div>
        );
    }
}

StudentEnrollmentCard.defaultProps = {
    student: {}
};

StudentEnrollmentCard.propTypes = {
    student: {
        id: PropTypes.string.isRequired
    }
};

export default StudentEnrollmentCard;
