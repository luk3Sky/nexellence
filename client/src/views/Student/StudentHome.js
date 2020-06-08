import React, { Component } from 'react';

import * as StudentService from 'services/StudentService';
import { HomeHeader } from 'components/Headers/PageHeader';
import StudentList from './StudentList';
import StudentFormWindow from './StudentForm/StudentFormWindow';

class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            addingStudent: false
        };
    }

    componentDidMount() {
        StudentService.findAll().then((students) => this.setState({ students }));
    }

    newHandler = () => {
        this.setState({
            addingStudent: true
        });
    };

    savedHandler = (student) => {
        this.setState({ addingStudent: false });
        window.location.hash = `#student/${student.id}`;
    };

    cancelHandler = () => {
        this.setState({ addingStudent: false });
    };

    render() {
        const { addingStudent, students } = this.state;
        return (
            <div>
                <HomeHeader
                    type="Students"
                    title="Recent Students"
                    newLabel="New Student"
                    actions={[{ value: 'new', label: 'New Student' }]}
                    itemCount={students.length}
                    views={[{ id: 1, name: 'Recent Students' }]}
                    viewId="1"
                    onNew={this.newHandler}
                />
                <StudentList students={students} />
                {addingStudent ? (
                    <StudentFormWindow
                        onSaved={this.savedHandler}
                        onCancel={this.cancelHandler}
                    />
                ) : null}
            </div>
        );
    }
}

export default StudentHome;
