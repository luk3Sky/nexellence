/* eslint-disable react/no-deprecated */
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import * as TeacherService from './services/TeacherService';

export default React.createClass({

    mixins: [LinkedStateMixin],

    getInitialState() {
        return this.props.teacher || {};
    },

    componentWillReceiveProps(props) {
        let teacher = props.teacher;
        this.setState({...teacher});
    },

    save() {
        let saveItem = this.state.id ? TeacherService.updateItem : TeacherService.createItem;
        saveItem(this.state).then(savedTeacher => {
            if (this.props.onSaved) this.props.onSaved(savedTeacher);
        });
    },

    render() {
        return (
            <div className="slds-form--stacked slds-grid slds-wrap">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">First Name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" valueLink={this.linkState('first_name')}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Last name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" valueLink={this.linkState('last_name')}/>
                        </div>
                    </div>
                    <fieldset className="slds-form--compound slds-m-top--medium slds-m-bottom--medium">
                        <legend className="slds-form-element__label">Address</legend>
                        <div className="form-element__group">
                            <div className="slds-form-element__row">
                                <label className="slds-form-element__control slds-size--1-of-1">
                                    <small className="slds-form-element__helper">Street</small>
                                    <input className="slds-input" type="text" valueLink={this.linkState('address')}/>
                                </label>
                            </div>
                            <div className="slds-form-element__row">
                                <label className="slds-form-element__control slds-size--2-of-4">
                                    <small className="slds-form-element__helper">City</small>
                                    <input className="slds-input" type="text" valueLink={this.linkState('city')}/>
                                </label>
                                <label className="slds-form-element__control slds-size--1-of-4">
                                    <small className="slds-form-element__helper">Province</small>
                                    <input className="slds-input" type="text" valueLink={this.linkState('province')}/>
                                </label>
                                <label className="slds-form-element__control slds-size--1-of-4">
                                    <small className="slds-form-element__helper">ZIP Code</small>
                                    <input className="slds-input" type="text" valueLink={this.linkState('zip')}/>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Mobile Phone</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" valueLink={this.linkState('mobile_phone')}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample2">Home Phone</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" valueLink={this.linkState('phone')}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Email</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" valueLink={this.linkState('email')}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Title</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" valueLink={this.linkState('title')}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});