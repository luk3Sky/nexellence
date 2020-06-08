import React, { Component } from 'react';
import moment from 'moment';

import * as StudentService from 'services/StudentService';

import { RecordHeader, HeaderField } from 'components/Headers/PageHeader';

class StudentRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {}
        };
    }

    componentDidMount() {
        const { params } = this.props;
        this.getStudent(params.studentId);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(props) {
        const { params } = props;
        this.getStudent(params.studentId);
    }

    getStudent = (id) => {
        StudentService.findById(id).then((student) => this.setState({ student }));
    };

    formatDOB = (dob) => {
        return dob ? `${moment(dob).format('l')} (${moment(dob).fromNow()})` : '';
    };

    deleteHandler = () => {
        const { student } = this.state;
        StudentService.deleteItem(student.id).then(
            // eslint-disable-next-line no-return-assign
            () => (window.location.hash = 'students')
        );
    };

    editHandler = () => {
        const { student } = this.state;
        window.location.hash = `#student/${student.id}/edit`;
    };

    render() {
        const { student } = this.state;
        const { children } = this.props;

        return (
            <div>
                <RecordHeader
                    type="Student"
                    icon="lead"
                    title={`${student.first_name} ${student.last_name}`}
                    onEdit={this.editHandler}
                    onDelete={this.deleteHandler}
                    onClone={this.cloneHandler}
                >
                    <HeaderField
                        label="Date of Birth"
                        value={student.dob}
                        format={this.formatDOB}
                    />
                    <HeaderField label="Mobile Phone" value={student.mobile_phone} />
                    <HeaderField label="Home Phone" value={student.phone} />
                    <HeaderField label="Email" value={student.email} />
                </RecordHeader>

                {React.cloneElement(children, {
                    student
                })}
            </div>
        );
    }
}

export default StudentRecord;
