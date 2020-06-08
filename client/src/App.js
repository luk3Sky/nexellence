import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import StudentRecord from 'views/Student/StudentRecord';
import studentView from 'views/Student/StudentView';
import studentFormWrapper from 'views/Student/StudentForm/StudentFormWrapper';
import CourseHome from 'views/Course/CourseHome';
import CourseRecord from 'views/Course/CourseRecord';
import courseView from 'views/Course/CourseView';
import CourseFormWrapper from 'views/Course/CourseForm/CourseFormWrapper';
import TeacherHome from 'views/Teacher/TeacherHome';
import TeacherRecord from 'views/Teacher/TeacherRecord';
import teacherView from 'views/Teacher/TeacherView';
import TeacherFormWrapper from 'views/Teacher/TeacherForm/TeacherFormWrapper';
import StudentHome from './views/StudentHome/StudentHome';
import Shell from './views/Shell/Shell';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path="/" component={Shell}>
                <Switch>
                    <Route exact path="/" component={StudentHome} />
                    <Route exact path="/student" component={StudentRecord}>
                        <Route path="/:studentId" component={studentView} />
                        <Route
                            path="/:studentId/edit"
                            component={studentFormWrapper}
                        />
                    </Route>
                    <Route path="/courses" component={CourseHome} />
                    <Route path="/course" component={CourseRecord}>
                        <Route path="/:courseId" component={courseView} />
                        <Route path="/:courseId/edit" component={CourseFormWrapper} />
                    </Route>
                    <Route path="/teachers" component={TeacherHome} />
                    <Route path="/teacher" component={TeacherRecord}>
                        <Route path="/:teacherId" component={teacherView} />
                        <Route
                            path="/:teacherId/edit"
                            component={TeacherFormWrapper}
                        />
                    </Route>
                    <Route path="*" component={StudentHome} />
                </Switch>
                </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
