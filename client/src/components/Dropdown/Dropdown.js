/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';

import PropTypes from 'prop-types';
import { Icon } from '../Icons/Icons';
// import {Action} from "./Icons";

const dropdownItem = (props) => {
    const { onSelect, index, value, label, icon } = props;

    const clickHandler = (event) => {
        event.preventDefault();
        onSelect(index, value, label, icon);
    };

    // slds-has-icon--left
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        <li className="slds-dropdown__item" role="menuitem option" tabIndex="-1">
            <button
                href="#"
                tabIndex="-1"
                type="button"
                className="slds-truncate"
                onClick={clickHandler}
            >
                {label}
                {icon ? (
                    <Icon
                        category="utility"
                        name={icon}
                        size="small"
                        position="right"
                    />
                ) : (
                    ''
                )}
            </button>
        </li>
    );
};

const dropdown = (
    props = {
        position: 'right'
    }
) => {
    const { data, valueField, onChange, labelField, position, size, header } = props;
    let items;

    if (data) {
        items = data.map((item, index) => (
            <DropdownItem
                index={index}
                key={item[valueField] || item.id}
                value={item[valueField] || item.id}
                label={item[labelField] || item.name}
                onSelect={onChange}
            />
        ));
    }
    let className = 'slds-dropdown slds-dropdown--menu';
    if (position) className = `${className} slds-dropdown--${position}`;
    if (size) className = `${className} slds-dropdown--${size}`;

    return (
        <div
            className={className}
            style={{ maxHeight: '250px', minWidth: '200px', overflow: 'scroll' }}
        >
            {header ? (
                <div className="slds-dropdown__header">
                    <span className="slds-text-heading--label">{header}</span>
                </div>
            ) : null}
            <ul
                className="slds-dropdown__list"
                role="menu"
                style={{ textAlign: 'left' }}
            >
                {items}
            </ul>
        </div>
    );
};

dropdown.propTypes = {
    data: PropTypes.any,
    valueField: PropTypes.string,
    labelField: PropTypes.string,
    onChange: PropTypes.func,
    position: PropTypes.string,
    size: PropTypes.string,
    header: PropTypes.string
};

dropdownItem.propTypes = {
    onSelect: PropTypes.func.isRequired,
    index: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    icon: PropTypes.object
};

export default dropdown;
export const DropdownItem = dropdownItem;
