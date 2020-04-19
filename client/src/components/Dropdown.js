import React from 'react';

import {Icon, ButtonIcon} from "./Icons";
// import {Action} from "./Icons";

const dropdownItem = (props) => {
    const clickHandler = event => {
        event.preventDefault();
        props.onSelect(props.index, props.value, props.label, props.icon);
    }

    // slds-has-icon--left
    return (
        <li className="slds-dropdown__item" role="menuitem option" tabIndex="-1">
            <a href="#" tabIndex="-1" className="slds-truncate" onClick={clickHandler}>
                {props.label}
                {props.icon ?
                    <Icon category="utility" name={props.icon} size="small" position="right"/>
                    : ""}
            </a>
        </li>
    );
}

const dropdown = (props) => {
    const getDefaultProps = () => {
        return {
            position: "right"
        };
    }

    let items;
    if (props.data) {
        items = props.data.map((item, index) =>
            <DropdownItem
                index={index}
                key={item[props.valueField] || item.id}
                value={item[props.valueField] || item.id}
                label={item[props.labelField] || item.name}
                onSelect={props.onChange}/>);
    }
    let className = "slds-dropdown slds-dropdown--menu";
    if (props.position) className = className + " slds-dropdown--" + props.position;
    if (props.size) className = className + " slds-dropdown--" + props.size;

    return (
        <div className={className} style={{maxHeight: "250px", minWidth: "200px", overflow: "scroll"}}>
            {props.header ?
                <div className="slds-dropdown__header">
                    <span className="slds-text-heading--label">{props.header}</span>
                </div> : null}
            <ul className="slds-dropdown__list" role="menu" style={{textAlign: "left"}}>
                {items}
            </ul>
        </div>
    );
}

export default dropdown;
export const DropdownItem = dropdownItem;
