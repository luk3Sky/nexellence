import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';

import TeacherCoursesCard from './TeacherCoursesCard';

const teacherView = (props) => {
    const { teacher } = props;
    return (
        <div className="slds-m-around--medium">
            <div className="slds-grid slds-wrap slds-m-bottom--large">
                <div className="slds-col--padded slds-size--1-of-1 slds-m-bottom--small">
                    <span
                        className="slds-avatar slds-avatar--large"
                        style={{ height: '120px', width: '120px' }}
                    >
                        <img src={teacher.pic} alt="portrait" />
                    </span>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2 slds-m-top--medium">
                    <dl className="page-header--rec-home__detail-item">
                        <dt>
                            <p
                                className="slds-text-heading--label slds-truncate"
                                title="Field 1"
                            >
                                Address
                            </p>
                        </dt>
                        <dd>
                            <p
                                className="slds-text-body--regular slds-truncate"
                                title=""
                            >
                                {teacher.address}
                                <br />
                                {teacher.zip} {teacher.city}
                            </p>
                        </dd>
                    </dl>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2 slds-m-top--medium">
                    <dl className="page-header--rec-home__detail-item">
                        <dt>
                            <p
                                className="slds-text-heading--label slds-truncate"
                                title="Field 1"
                            >
                                Title
                            </p>
                        </dt>
                        <dd>
                            <p
                                className="slds-text-body--regular slds-truncate"
                                title=""
                            >
                                {teacher.title}
                            </p>
                        </dd>
                    </dl>
                </div>
            </div>
            <TeacherCoursesCard teacher={teacher} />
        </div>
    );
};

teacherView.defaultProps = {
    teacher: {}
};

teacherView.propTypes = {
    teacher: {
        pic: PropTypes.string.isRequired,
        zip: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired
    }
};

export default teacherView;
