import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, IndexRoute } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Shell from './views/Shell/Shell';
import StudentHome from './views/StudentHome/StudentHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route path="/" component={Shell}>
              <Route component={StudentHome}/>
              {/* <Route path="student" component={StudentRecord}>
                  <Route path=":studentId" component={StudentView}/>
                  <Route path=":studentId/edit" component={StudentFormWrapper}/>
              </Route> */}
              {/* <Route path="courses" component={CourseHome}/>
              <Route path="course" component={CourseRecord}>
                  <Route path=":courseId" component={CourseView}/>
                  <Route path=":courseId/edit" component={CourseFormWrapper}/>
              </Route>
              <Route path="teachers" component={TeacherHome}/>
              <Route path="teacher" component={TeacherRecord}>
                  <Route path=":teacherId" component={TeacherView}/>
                  <Route path=":teacherId/edit" component={TeacherFormWrapper}/>
              </Route>
              <Route path="*" component={StudentHome}/> */}
          </Route>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
