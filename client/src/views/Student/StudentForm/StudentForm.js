/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as StudentService from 'services/StudentService';

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first_name: '',
            last_name: '',
            address: '',
            city: '',
            province: '',
            zip: undefined,
            mobile_phone: '',
            phone: '',
            email: '',
            dob: undefined
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { student } = props;
        this.setState({ ...student });
    }

    save = () => {
        const { id } = this.state;
        const { onSaved } = this.props;
        const saveItem = id ? StudentService.updateItem : StudentService.createItem;
        saveItem(this.state).then((savedStudent) => {
            if (onSaved) onSaved(savedStudent);
        });
    };

    render() {
        const {
            first_name,
            last_name,
            address,
            city,
            province,
            zip,
            mobile_phone,
            phone,
            email,
            dob
        } = this.state;
        return (
            <div className="slds-form--stacked slds-grid slds-wrap">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            First Name
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={first_name}
                            />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Last name
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={last_name}
                            />
                        </div>
                    </div>
                    <fieldset className="slds-form--compound slds-m-top--medium slds-m-bottom--medium">
                        <legend className="slds-form-element__label">Address</legend>
                        <div className="form-element__group">
                            <div className="slds-form-element__row">
                                <label className="slds-form-element__control slds-size--1-of-1">
                                    <small className="slds-form-element__helper">
                                        Street
                                    </small>
                                    <input
                                        className="slds-input"
                                        type="text"
                                        value={address}
                                    />
                                </label>
                            </div>
                            <div className="slds-form-element__row">
                                <label className="slds-form-element__control slds-size--2-of-4">
                                    <small className="slds-form-element__helper">
                                        City
                                    </small>
                                    <input
                                        className="slds-input"
                                        type="text"
                                        value={city}
                                    />
                                </label>
                                <label className="slds-form-element__control slds-size--1-of-4">
                                    <small className="slds-form-element__helper">
                                        Province
                                    </small>
                                    <input
                                        className="slds-input"
                                        type="text"
                                        value={province}
                                    />
                                </label>
                                <label className="slds-form-element__control slds-size--1-of-4">
                                    <small className="slds-form-element__helper">
                                        ZIP Code
                                    </small>
                                    <input
                                        className="slds-input"
                                        type="text"
                                        value={zip}
                                    />
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Mobile Phone
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={mobile_phone}
                            />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample2"
                        >
                            Home Phone
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={phone}
                            />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Email
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                className="slds-input"
                                type="text"
                                value={email}
                            />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="sample1"
                        >
                            Date of Birth
                        </label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={dob} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentForm.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    student: PropTypes.object.isRequired,
    onSaved: PropTypes.func.isRequired
};

export default StudentForm;
