import React, { Component } from 'react';

import Spinner from 'components/Spinner/Spinner';
import Toast from 'components/Toast/Toast';
import { Icon } from 'components/Icons/Icons';
import StudentSearchBox from 'views/Student/StudentSearchBox';

export default class Shell extends Component {
    selectHandler = (index, value) => {
        window.location.hash = `student/${value}`;
    };

    render() {
        return (
            <div>
                <Spinner />
                <Toast />
                <header
                    className="menu"
                    style={{ backgroundColor: '#01344E', verticalAlign: 'middle' }}
                >
                    <ul className="slds-list--horizontal">
                        <li className="slds-list__item">
                            <a href="#students">
                                <Icon name="lead" theme={null} />
                                Students
                            </a>
                        </li>
                        <li className="slds-list__item">
                            <a href="#courses">
                                <Icon name="orders" theme={null} />
                                Courses
                            </a>
                        </li>
                        <li className="slds-list__item slds-m-right--xx-large">
                            <a href="#teachers">
                                <Icon name="user" theme={null} />
                                Teachers
                            </a>
                        </li>
                        <li className="slds-list__item slds-m-top--xx-small">
                            <StudentSearchBox onSelect={this.selectHandler} />
                        </li>
                    </ul>
                </header>
                {this.props.children}
            </div>
        );
    }
}
