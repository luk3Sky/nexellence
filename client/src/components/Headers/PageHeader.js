/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import moment from 'moment';

import Dropdown, { DropdownItem } from 'components/Dropdown/Dropdown';
import { Icon, ButtonIcon } from 'components/Icons/Icons';
import DownButtonDropdown from '../Dropdown/DownButtonDropdown';

export class ButtonDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            label: this.props.label || 'Select an option'
        };
    }

    // getDefaultProps = () => {
    //     return {
    //         valueField: 'value',
    //         labelField: 'label',
    //         iconField: 'icon'
    //     };
    // };

    changeHandler = (value, label, icon) => {
        this.setState({
            value,
            label,
            icon,
            opened: false
        });
        this.props.onChange(value, label);
    };

    render() {
        let label;
        let icon;
        const items = this.props.children;
        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (item.props[this.props.valueField] === this.state.value) {
                label = item.props[this.props.labelField];
                icon = item.props[this.props.iconField];
                break;
            }
        }
        const className = 'slds-button slds-button--icon-more';
        return (
            <div className="slds-dropdown-trigger" aria-haspopup="true">
                <button type="button" className={className} aria-haspopup="true">
                    <ButtonIcon name={icon || this.props.icon} />
                    <span className="slds-assistive-text">Settings</span>
                    <ButtonIcon name="down" size="x-small" />
                    <span className="slds-assistive-text">More</span>
                </button>
                <Dropdown
                    header={this.props.header}
                    valueField={this.props.valueField}
                    labelField={this.props.labelField}
                    items={this.props.children}
                    size="small"
                    onChange={this.changeHandler}
                />
            </div>
        );
    }
}

export const HeaderField = (props) => {
    let { value } = props;

    if (props.format === 'currency') {
        value = parseFloat(value).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    } else if (props.format === 'date') {
        value = moment(value).format('YYYY/MM/DD');
    } else if (typeof props.format === 'function') {
        value = props.format(value);
    }

    return (
        <div className="slds-col--padded">
            <dl>
                <dt>
                    <p
                        className="slds-text-heading--label slds-truncate"
                        title="City"
                    >
                        {props.label}
                    </p>
                </dt>
                <dd>
                    <p
                        className="slds-text-body--regular slds-truncate"
                        title={value}
                    >
                        {value}
                    </p>
                </dd>
            </dl>
        </div>
    );
};

export const RecordHeader = (props) => {
    const getDefaultProps = () => {
        return {
            icon: 'account'
        };
    };

    const followHandler = () => {
        // eslint-disable-next-line no-alert
        alert('Not implemented in this demo app');
    };

    return (
        <div className="slds-page-header">
            <div className="slds-grid">
                <div className="slds-col slds-has-flexi-truncate">
                    <div className="slds-media">
                        <div className="slds-media__figure">
                            <Icon name={props.icon} size="large" />
                        </div>
                        <div className="slds-media__body">
                            <p className="slds-text-heading--label">{props.type}</p>
                            <div className="slds-grid">
                                <h1
                                    className="slds-text-heading--medium slds-m-right--small slds-truncate slds-align-middle"
                                    title={props.title}
                                >
                                    {props.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slds-col slds-no-flex slds-align-bottom">
                    <div className="slds-button-group" role="group">
                        <button
                            type="button"
                            className="slds-button slds-button--neutral"
                            onClick={props.onEdit}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="slds-button slds-button--neutral"
                            onClick={props.onDelete}
                        >
                            Delete
                        </button>
                        <div className="slds-button--last">
                            <button
                                type="button"
                                className="slds-button slds-button--icon-border-filled"
                            >
                                <ButtonIcon name="down" />
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
};

export const HomeHeader = (props) => {
    const getDefaultProps = () => {
        return {
            newLabel: 'New',
            icon: 'account'
        };
    };

    let viewItems;
    if (props.viewOptions) {
        viewItems = props.viewOptions.map((item) => (
            <DropdownItem value={item.value} label={item.label} icon={item.icon} />
        ));
    }
    let sortItems;
    if (props.sortOptions) {
        sortItems = props.sortOptions.map((item) => (
            <DropdownItem value={item.value} label={item.label} />
        ));
    }
    return (
        <div className="slds-page-header">
            <div className="slds-grid">
                <div className="slds-col slds-no-flex slds-has-flexi-truncate">
                    <p className="slds-text-heading--label">{props.type}</p>
                    <DownButtonDropdown
                        data={props.views}
                        value={props.viewId}
                        onChange={props.onViewChange}
                    />
                </div>
                <div className="slds-col" />
                <div className="slds-col slds-no-flex slds-align-bottom">
                    <div className="slds-grid">
                        {viewItems ? (
                            <div className="slds-button-space-left">
                                <ButtonDropdown
                                    header="Display as"
                                    iconMore
                                    value={props.viewOptions[0].value}
                                    onChange={props.onViewChange}
                                >
                                    {viewItems}
                                </ButtonDropdown>
                            </div>
                        ) : null}
                        {sortItems ? (
                            <div className="slds-button-space-left">
                                <ButtonDropdown
                                    header="Sort By"
                                    icon="sort"
                                    iconMore
                                    onChange={props.onSort}
                                >
                                    {sortItems}
                                </ButtonDropdown>
                            </div>
                        ) : null}
                        <div
                            className="slds-button-group slds-button-space-left"
                            role="group"
                        >
                            <button
                                type="button"
                                className="slds-button slds-button--neutral"
                                onClick={props.onNew}
                            >
                                {props.newLabel}
                            </button>
                            <div className="slds-button--last">
                                <button
                                    type="button"
                                    className="slds-button slds-button--icon-border-filled"
                                >
                                    <ButtonIcon name="down" />
                                    <span className="slds-assistive-text">
                                        More Actions
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="slds-text-body--small slds-m-top--x-small">
                {props.itemCount} {props.type.toLowerCase()}
            </p>
        </div>
    );
};
