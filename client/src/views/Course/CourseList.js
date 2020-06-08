import React from 'react';
import DataGrid from 'components/DataGrid/DataGrid';

const courseList = (props) => {
    const courseLinkHandler = (course) => {
        window.location.hash = `#course/${course.id}`;
    };

    const teacherLinkHandler = (course) => {
        window.location.hash = `#teacher/${course.teacher_id}`;
    };

    const rowClick = (data) => {
        if (props.onRowClick) {
            props.onRowClick(data);
        }
    };

    return (
        <DataGrid
            data={props.courses}
            onRowClick={rowClick}
            ignoreLinks={props.ignoreLinks}
        >
            <div header="Period" field="period_name" />
            <div header="Code" field="code" onLink={courseLinkHandler} />
            <div header="Name" field="name" onLink={courseLinkHandler} />
            <div header="Teacher" field="teacher_name" onLink={teacherLinkHandler} />
            <div header="Credits" field="credits" textAlign="right" />
            <div header="#Enrolled" field="student_count" textAlign="right" />
        </DataGrid>
    );
};

export default courseList;
