/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import * as TeacherService from 'services/TeacherService';
import { RecordHeader, HeaderField } from 'components/Headers/PageHeader';

class TeacherRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: {}
        };
    }

    componentDidMount() {
        const { params } = this.props;
        this.getTeacher(params.teacherId);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(props) {
        this.getTeacher(props.params.teacherId);
    }

    getTeacher = (id) => {
        TeacherService.findById(id).then((teacher) => this.setState({ teacher }));
    };

    deleteHandler = () => {
        const { teacher } = this.state;
        TeacherService.deleteItem(teacher.id).then(
            // eslint-disable-next-line no-return-assign
            () => (window.location.hash = 'teachers')
        );
    };

    editHandler = () => {
        const { teacher } = this.state;
        window.location.hash = `#teacher/${teacher.id}/edit`;
    };

    render() {
        const { teacher } = this.state;
        const { children } = this.props;

        return (
            <div>
                <RecordHeader
                    type="Teacher"
                    icon="user"
                    title={`Professor ${teacher.first_name} ${teacher.last_name}`}
                    onEdit={this.editHandler}
                    onDelete={this.deleteHandler}
                    onClone={this.cloneHandler}
                >
                    <HeaderField label="Mobile Phone" value={teacher.mobile_phone} />
                    <HeaderField label="Home Phone" value={teacher.phone} />
                    <HeaderField label="Email" value={teacher.email} />
                </RecordHeader>

                {React.cloneElement(children, {
                    teacher
                })}
            </div>
        );
    }
}

export default TeacherRecord;
