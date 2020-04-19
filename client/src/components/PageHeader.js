import React, { Component } from 'react';

import moment from 'moment';

import {Icon, ButtonIcon} from "./Icons";
import Dropdown from "./Dropdown";
import { DropdownItem } from "./Dropdown";

export class DownButtonDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            label: ''
        }
    }

    componentWillReceiveProps(props) {
        let label;
        let icon;
        const items = props.data;
        for (let i=0; i<items.length; i++) {
            let item = items[i];
            if (item[props.valueField || "id"] == props.value) {
                label = item[props.labelField || "name"];
                icon = item[props.iconField];
                break;
            }
        }
        this.setState({value:this.props.value, label});
    }

    changeHandler = (index, value, label) => {
        this.setState({
            value, label, open:false
        });
        if (this.props.onChange) {
            this.props.onChange(index, value, label);
        }
    }

    buttonClickHandler = () => {
        this.setState({open:true});
    }

    render() {
        return (
            <div className="slds-grid slds-type-focus  slds-no-space">
                <h1 className="slds-text-heading--medium slds-truncate" title="{this.state.label}">{this.state.label}</h1>
                <div className="slds-dropdown-trigger" aria-haspopup="true">
                    <button className="slds-button slds-button--icon-bare slds-shrink-none slds-align-middle slds-m-left--x-small" onClick={this.buttonClickHandler}>
                        <ButtonIcon name="down"/>
                        <span className="slds-assistive-text">View More</span>
                    </button>
                    {this.state.open?
                        <Dropdown position="left" header={this.props.header}
                                  valueField={this.props.valueField}
                                  labelField={this.props.labelField}
                                  data={this.props.data}
                                  onChange={this.changeHandler}/>
                        :null}
                </div>
            </div>
        );
    }

}

export class ButtonDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            label: this.props.label || 'Select an option'
        };
    }

    getDefaultProps = () => {
        return {
            valueField: "value",
            labelField: "label",
            iconField: "icon"
        };
    }

    changeHandler = (value, label, icon) => {
        this.setState({
            value: value, label: label, icon: icon, opened: false
        });
        this.props.onChange(value, label);
    }

    render() {
        let label;
        let icon;
        const items = this.props.children;
        for (let i=0; i < items.length; i++) {
            let item = items[i];
            if (item.props[this.props.valueField] == this.state.value) {
                label = item.props[this.props.labelField];
                icon = item.props[this.props.iconField];
                break;
            }
        }
        let className = "slds-button slds-button--icon-more";
        return (
            <div className="slds-dropdown-trigger" aria-haspopup="true">
                <button className={className} aria-haspopup="true">
                    <ButtonIcon name={icon || this.props.icon}/>
                    <span className="slds-assistive-text">Settings</span>
                    <ButtonIcon name="down" size="x-small"/>
                    <span className="slds-assistive-text">More</span>
                </button>
                <Dropdown header={this.props.header}
                          valueField={this.props.valueField}
                          labelField={this.props.labelField}
                          items={this.props.children}
                          size="small"
                          onChange={this.changeHandler}/>
            </div>
        );
    }
}

export const HeaderField = (props) => {
    let value = props.value;

    if (props.format === "currency") {
        value = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else if (props.format === "date") {
        value = moment(value).format("YYYY/MM/DD");
    } else if (typeof props.format === "function") {
        value = props.format(value);
    }

    return (
        <div className="slds-col--padded">
            <dl>
                <dt>
                    <p className="slds-text-heading--label slds-truncate" title="City">{props.label}</p>
                </dt>
                <dd>
                    <p className="slds-text-body--regular slds-truncate" title={value}>{value}</p>
                </dd>
            </dl>
        </div>
    );
}

export const RecordHeader = (props) => {

    const getDefaultProps = () => {
        return {
            icon: "account"
        }
    }

    const followHandler = () => {
        alert("Not implemented in this demo app");
    }

    return (
        <div className="slds-page-header">
            <div className="slds-grid">
                <div className="slds-col slds-has-flexi-truncate">
                    <div className="slds-media">
                        <div className="slds-media__figure">
                            <Icon name={props.icon} size="large"/>
                        </div>
                        <div className="slds-media__body">
                            <p className="slds-text-heading--label">{props.type}</p>
                            <div className="slds-grid">
                                <h1 className="slds-text-heading--medium slds-m-right--small slds-truncate slds-align-middle" title={props.title}>{props.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slds-col slds-no-flex slds-align-bottom">
                    <div className="slds-button-group" role="group">
                        <button className="slds-button slds-button--neutral" onClick={props.onEdit}>Edit</button>
                        <button className="slds-button slds-button--neutral" onClick={props.onDelete}>Delete</button>
                        <div className="slds-button--last">
                            <button className="slds-button slds-button--icon-border-filled">
                                <ButtonIcon name="down"/>
                                <span className="slds-assistive-text">More</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slds-grid slds-page-header__detail-row">
                {props.children}
            </div>
        </div>
    );
}

export const HomeHeader = (props) => {

    const getDefaultProps = () => {
        return {
            newLabel: "New",
            icon: "account"
        }
    }

    let viewItems;
    if (props.viewOptions) {
        viewItems = props.viewOptions.map(item => <DropdownItem value={item.value} label={item.label} icon={item.icon}/>);
    }
    let sortItems;
    if (props.sortOptions) {
        sortItems = props.sortOptions.map(item => <DropdownItem value={item.value} label={item.label}/>);
    }
    return (
        <div className="slds-page-header">
            <div className="slds-grid">
                <div className="slds-col slds-no-flex slds-has-flexi-truncate">
                    <p className="slds-text-heading--label">{props.type}</p>
                    <DownButtonDropdown data={props.views} value={props.viewId} onChange={props.onViewChange}/>
                </div>
                <div className="slds-col">
                </div>
                <div className="slds-col slds-no-flex slds-align-bottom">
                    <div className="slds-grid">
                        {viewItems ?
                        <div className="slds-button-space-left">
                            <ButtonDropdown header="Display as" iconMore={true} value={props.viewOptions[0].value} onChange={props.onViewChange}>
                                {viewItems}
                            </ButtonDropdown>
                        </div>
                        : ""}
                        {sortItems ?
                        <div className="slds-button-space-left">
                            <ButtonDropdown header="Sort By" icon="sort" iconMore={true} onChange={props.onSort}>
                                {sortItems}
                            </ButtonDropdown>
                        </div>
                        : ""}
                        <div className="slds-button-group slds-button-space-left" role="group">
                            <button className="slds-button slds-button--neutral" onClick={props.onNew}>{props.newLabel}</button>
                            <div className="slds-button--last">
                                <button className="slds-button slds-button--icon-border-filled">
                                    <ButtonIcon name="down"/>
                                    <span className="slds-assistive-text">More Actions</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="slds-text-body--small slds-m-top--x-small">{props.itemCount} {props.type.toLowerCase()}</p>
        </div>
    );
}