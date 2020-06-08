/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { ButtonIcon } from 'components/Icons/Icons';
import ActionButton from 'components/DataGrid/ActionButton';

const ColumnHeader = (
    props = {
        textAlign: 'left',
        sortable: true
    }
) => {
    const { onSort, field, sortable, textAlign, label } = props;

    const sortHandler = () => {
        onSort(field);
    };

    return (
        <th
            key={field}
            className={sortable ? 'slds-is-sortable' : null}
            scope="col"
            style={{ textAlign }}
        >
            <span className="slds-truncate">{label}</span>
            {sortable ? (
                <button
                    className="slds-button slds-button--icon-bare slds-button--icon-border-small"
                    onClick={sortHandler}
                    type="button"
                >
                    <ButtonIcon name="arrowdown" size="--small" />
                    <span className="slds-assistive-text">Sort</span>
                </button>
            ) : null}
        </th>
    );
};

const Column = (props) => {
    const { onLink, data, field, format, ignoreLinks, label, textAlign } = props;
    const linkHandler = (event) => {
        if (onLink) {
            onLink(data);
        }
        event.preventDefault();
    };

    let value = data[field];
    if (format === 'currency') {
        value = parseFloat(value).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    } else if (format === 'date') {
        value = moment(value).format('YYYY/MM/DD');
    }

    if (onLink && !ignoreLinks) {
        value = (
            <button href="#" onClick={linkHandler} type="button">
                {value}
            </button>
        );
    }

    return (
        <td data-label={label} style={{ textAlign }}>
            <span className="slds-truncate">{value}</span>
        </td>
    );
};

const Row = (props) => {
    const {
        onAction,
        onClick,
        columns: propColumns,
        actions: propActions,
        data,
        ignoreLinks,
        selected
    } = props;

    const actionHandler = (index, value, label) => {
        onAction(data, index, value, label);
    };

    const clickHandler = () => {
        if (onClick) {
            onClick(data);
        }
    };

    const columns = [];
    for (let i = 0; i < propColumns.length; i += 1) {
        const column = propColumns[i];
        if (column.props && column.props.field) {
            columns.push(
                <Column
                    label={column.props.header}
                    data={data}
                    field={column.props.field}
                    textAlign={column.props.textAlign}
                    format={column.props.format}
                    ignoreLinks={ignoreLinks}
                    onLink={column.props.onLink}
                />
            );
        }
    }

    if (propActions) {
        const actions = propActions.map((action, index) => ({
            id: index,
            name: action
        }));
        columns.push(
            <td style={{ width: '50px' }}>
                <ActionButton actions={actions} onChange={actionHandler} />
            </td>
        );
    }

    return (
        <tr
            className="slds-hint-parent"
            onClick={clickHandler}
            style={{ backgroundColor: selected ? '#F4F6F9' : 'transparent' }}
        >
            {columns}
        </tr>
    );
};

class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        });
    }

    sortHandler = (field) => {
        const { data } = this.state;
        data.sort((x, y) => {
            if (x[field] < y[field]) {
                return -1;
            }
            if (x[field] === y[field]) {
                return 0;
            }
            return 1;
        });
        this.setState({ data });
    };

    rowClickHandler = (data) => {
        const { onRowClick } = this.props;
        if (onRowClick) {
            this.setState({ selectedItem: data });
            onRowClick(data);
        }
    };

    render() {
        const { data, selectedItem } = this.state;
        const { children, keyField, actions, ignoreLinks, onAction } = this.props;
        const headers = [];
        for (let i = 0; i < children.length; i += 1) {
            const column = children[i];
            if (column.props && column.props.field) {
                headers.push(
                    <ColumnHeader
                        field={column.props.field}
                        key={column.props.field}
                        label={column.props.header}
                        sortable={column.props.sortable}
                        textAlign={column.props.textAlign}
                        onSort={this.sortHandler}
                    />
                );
            }
        }
        let rows;
        if (data) {
            rows = data.map((item) => (
                <Row
                    data={item}
                    key={item[keyField || 'id']}
                    selected={item === selectedItem}
                    columns={children}
                    actions={actions}
                    ignoreLinks={ignoreLinks}
                    onAction={onAction}
                    onClick={this.rowClickHandler}
                />
            ));
        }
        return (
            <table
                className="slds-table slds-table--bordered slds-max-medium-table--stacked-horizontal slds-no-row-hover"
                style={{ marginTop: '-1px' }}
            >
                <thead>
                    <tr className="slds-text-heading--label">
                        {headers}
                        {onAction ? <th /> : null}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

ColumnHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
    textAlign: PropTypes.any,
    label: PropTypes.string.isRequired
};

ColumnHeader.defaultProps = {
    textAlign: undefined,
    sortable: undefined
};

Column.propTypes = {
    onLink: PropTypes.func.isRequired,
    data: PropTypes.any.isRequired,
    field: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    ignoreLinks: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    textAlign: PropTypes.any.isRequired
};

Column.defaultProps = {};

Row.propTypes = {
    onAction: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    columns: PropTypes.any.isRequired,
    actions: PropTypes.any.isRequired,
    data: PropTypes.any.isRequired,
    ignoreLinks: PropTypes.bool.isRequired,
    selected: PropTypes.string.isRequired
};

DataGrid.propTypes = {
    children: PropTypes.any,
    data: PropTypes.any,
    keyField: PropTypes.string,
    actions: PropTypes.func,
    ignoreLinks: PropTypes.any,
    onAction: PropTypes.func,
    onRowClick: PropTypes.func
};

DataGrid.defaultProps = {
    keyField: '',
    ignoreLinks: undefined,
    actions: undefined,
    onAction: undefined,
    onRowClick: undefined,
    children: [],
    data: []
};

export default DataGrid;
