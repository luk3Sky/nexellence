import React, { Component } from 'react';
import * as TeacherService from 'services/TeacherService';
import { HomeHeader } from 'components/Headers/PageHeader';
import TeacherList from './TeacherList';
import TeacherFormWindow from './TeacherForm/TeacherFormWindow';

class TeacherHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            addingTeacher: false
        };
    }

    componentDidMount() {
        TeacherService.findAll().then((teachers) => this.setState({ teachers }));
    }

    newHandler = () => {
        this.setState({ addingTeacher: true });
    };

    savedHandler = (teacher) => {
        this.setState({ addingTeacher: false });
        window.location.hash = `#teacher/${teacher.id}`;
    };

    cancelHandler = () => {
        this.setState({ addingTeacher: false });
    };

    render() {
        const { teachers, addingTeacher } = this.state;

        return (
            <div>
                <HomeHeader
                    type="Teachers"
                    title="Recent Teachers"
                    newLabel="New Teacher"
                    actions={[{ value: 'new', label: 'New Teacher' }]}
                    itemCount={teachers.length}
                    views={[{ id: 1, name: 'Recent Teachers' }]}
                    viewId="1"
                    onNew={this.newHandler}
                />
                <TeacherList teachers={teachers} />
                {addingTeacher ? (
                    <TeacherFormWindow
                        onSaved={this.savedHandler}
                        onCancel={this.cancelHandler}
                    />
                ) : null}
            </div>
        );
    }
}

export default TeacherHome;
