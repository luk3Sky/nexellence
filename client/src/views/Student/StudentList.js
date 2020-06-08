/* eslint-disable react/no-deprecated */
import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'components/DataGrid/DataGrid';

const studentList = (props) => {
    const { students } = props;

    const linkHandler = (student) => {
        window.location.hash = `#student/${student.id}`;
    };

    // eslint-disable-next-line no-unused-vars
    const actionHandler = (data, value, label) => {
        if (label === 'Delete') {
            props.onDelete(data);
        } else if (label === 'Edit') {
            props.onEdit(data);
        }
    };

    return (
        <DataGrid data={students}>
            <div header="First Name" field="first_name" onLink={linkHandler} />
            <div header="Last Name" field="last_name" onLink={linkHandler} />
            <div header="Address" field="address" />
            <div header="City" field="city" />
            <div header="Province" field="province" />
        </DataGrid>
    );
};

studentList.defaultProps = {
    students: []
};

studentList.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    students: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default studentList;
