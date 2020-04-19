import React, { Component } from 'react';
import moment from 'moment';

import {ButtonIcon} from "./Icons";
import Dropdown from "./Dropdown";
import {DropdownItem} from "./Dropdown";

export class ActionButton extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    changeHandler = (index, value, label) => {
        this.setState({
            value: value, 
            label: label, 
            opened: false
        });
        this.props.onChange(index, value, label);
    }

    render() {
        return (
            <div className="slds-dropdown-trigger" aria-haspopup="true">
                <button className="slds-button slds-button--icon-border-filled slds-button--icon-border-small">
                    <ButtonIcon name="down" size="small"/>
                    <span className="slds-assistive-text">More</span>
                </button>
                <Dropdown header={this.props.header}
                          valueField={this.props.valueField}
                          labelField={this.props.labelField}
                          data={this.props.actions}
                          onChange={this.changeHandler}/>
            </div>
        );
    }

}

const ColumnHeader = (props = {
    textAlign: "left",
    sortable: true
}) => {

    const getDefaultProps = () => {
        return {
            textAlign: "left",
            sortable: true
        };
    }

    const sortHandler = () => {
        props.onSort(props.field);
    }

    return (
        <th className={props.sortable ? "slds-is-sortable" : ""} scope="col"  style={{textAlign: props.textAlign}}>
            <span className="slds-truncate">{props.label}</span>
            {props.sortable ?
                <button className="slds-button slds-button--icon-bare slds-button--icon-border-small" onClick={sortHandler}>
                    <ButtonIcon name="arrowdown" size="--small"/>
                    <span className="slds-assistive-text">Sort</span>
                </button> : ""
            }
        </th>
    );
}

const Column = (props) => {

    const linkHandler = (event) => {
        if (props.onLink) {
            props.onLink(props.data);
        }
        event.preventDefault();
    }

    let value = props.data[props.field];
    if (props.format === "currency") {
        value = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else if (props.format === "date") {
        value = moment(value).format("YYYY/MM/DD");
    }

    if (props.onLink && !props.ignoreLinks) {
        value = <a href="#" onClick={linkHandler}>{value}</a>
    }

    return (
        <td data-label={props.label} style={{textAlign: props.textAlign}}>
            <span className="slds-truncate">
                {value}
            </span>
        </td>
    );
}

const Row = (props) => {
    const actionHandler = (index, value, label) => {
        props.onAction(props.data, index, value, label);
    }

    const clickHandler = () => {
        if (props.onClick) {
            props.onClick(props.data);
        }
    }

    let columns = [];
    for (let i=0; i<props.columns.length; i++) {
        let column = props.columns[i];
        if (column.props && column.props.field) {
            columns.push(<Column label={column.props.header}
                                    data={props.data}
                                    field={column.props.field}
                                    textAlign={column.props.textAlign} format={column.props.format}
                                    ignoreLinks={props.ignoreLinks}
                                    onLink={column.props.onLink}/>);
        }
    }

    if (props.actions) {
        let actions = props.actions.map((action, index) => ({id: index, name: action}));
        columns.push(
            <td style={{width:"50px"}}>
                <ActionButton actions={actions} onChange={actionHandler}/>
            </td>
        );
    }

    return (
        <tr className="slds-hint-parent" onClick={clickHandler} style={{backgroundColor: props.selected?"#F4F6F9":"transparent"}}>
            {columns}
        </tr>
    );
}

export default class DataGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };     
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        });
    }

    sortHandler = (field) => {
        let data = this.state.data;
        data.sort((x,y) => {
            if (x[field] < y[field]) {
                return -1;
            } else if (x[field] == y[field]) {
                return 0;
            } else {
                return 1;
            }
        });
        this.setState({data});
    }

    rowClickHandler = (data) => {
        if (this.props.onRowClick) {
            this.setState({selectedItem: data});
            this.props.onRowClick(data);
        }
    }

    render() {
        let headers = [];
        for (let i=0; i<this.props.children.length; i++) {
            let column = this.props.children[i];
            if (column.props && column.props.field) {
                headers.push(<ColumnHeader field={column.props.field}
                                           label={column.props.header}
                                           sortable={column.props.sortable}
                                           textAlign={column.props.textAlign}
                                           onSort={this.sortHandler}/>);
            }
        }
        let rows;
        if (this.state.data) {
            rows = this.props.data.map(item => <Row data={item}
                                                    key={item[this.props.keyField || "id"]}
                                                    selected={item===this.state.selectedItem}
                                                    columns={this.props.children}
                                                    actions={this.props.actions}
                                                    ignoreLinks={this.props.ignoreLinks}
                                                    onAction={this.props.onAction}
                                                    onClick={this.rowClickHandler}/>);
        }
        return (
            <table className="slds-table slds-table--bordered slds-max-medium-table--stacked-horizontal slds-no-row-hover" style={{marginTop:"-1px"}}>
                <thead>
                <tr className="slds-text-heading--label">
                    {headers}
                    {this.props.onAction ?
                    <th></th>
                    :""}
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}