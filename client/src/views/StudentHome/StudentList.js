/* eslint-disable react/no-deprecated */
import React from 'react';
import DataGrid from '../../components/DataGrid';

const studentList = (props) => {
    const linkHandler = (student) => {
        window.location.hash = "#student/" + student.id;
    }

    const actionHandler = (data, value, label) => {
        if (label === "Delete") {
            props.onDelete(data);
        } else if (label === "Edit") {
            props.onEdit(data);
        }
    }

    return (
        <DataGrid data={props.students}>
            <div header="First Name" field="first_name" onLink={linkHandler}/>
            <div header="Last Name" field="last_name" onLink={linkHandler}/>
            <div header="Address" field="address"/>
            <div header="City" field="city"/>
            <div header="Province" field="province"/>
        </DataGrid>
    );
}

export default studentList;