/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';

import * as StudentService from '../../services/StudentService';

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

    componentWillReceiveProps(props) {
        const { student } = props;
        this.setState({ ...student });
    }

    save = () => {
        const saveItem = this.state.id
            ? StudentService.updateItem
            : StudentService.createItem;
        saveItem(this.state).then((savedStudent) => {
            if (this.props.onSaved) this.props.onSaved(savedStudent);
        });
    };

    render() {
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
                                value={this.state.first_name}
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
                                value={this.state.last_name}
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
                                        value={this.state.address}
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
                                        value={this.state.city}
                                    />
                                </label>
                                <label className="slds-form-element__control slds-size--1-of-4">
                                    <small className="slds-form-element__helper">
                                        Province
                                    </small>
                                    <input
                                        className="slds-input"
                                        type="text"
                                        value={this.state.province}
                                    />
                                </label>
                                <label className="slds-form-element__control slds-size--1-of-4">
                                    <small className="slds-form-element__helper">
                                        ZIP Code
                                    </small>
                                    <input
                                        className="slds-input"
                                        type="text"
                                        value={this.state.zip}
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
                                value={this.state.mobile_phone}
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
                                value={this.state.phone}
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
                                value={this.state.email}
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
                            <input
                                className="slds-input"
                                type="text"
                                value={this.state.dob}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentForm;