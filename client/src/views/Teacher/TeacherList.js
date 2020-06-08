import React from 'react';
import DataGrid from 'components/DataGrid/DataGrid';
import PropTypes from 'prop-types';

const teacherList = (props) => {
    const { onDelete, onEdit, teachers } = props;

    const linkHandler = (teacher) => {
        window.location.hash = `#teacher/${teacher.id}`;
    };

    // eslint-disable-next-line no-unused-vars
    const actionHandler = (data, value, label) => {
        if (label === 'Delete') {
            onDelete(data);
        } else if (label === 'Edit') {
            onEdit(data);
        }
    };

    return (
        <DataGrid data={teachers}>
            <div header="First Name" field="first_name" onLink={linkHandler} />
            <div header="Last Name" field="last_name" onLink={linkHandler} />
            <div header="Address" field="address" />
            <div header="City" field="city" />
        </DataGrid>
    );
};

teacherList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    teachers: PropTypes.array.isRequired
};

export default teacherList;
