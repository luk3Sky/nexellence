import * as rest from './rest';

const url = '/enrollments';

export const findByStudent = (studentId, queryParams) =>
    rest.get(`/students/${studentId}${url}`, queryParams);

export const findByCourse = (courseId, queryParams) =>
    rest.get(`/courses/${courseId}${url}`, queryParams);

export const createItem = (enrollment) => rest.post(url, enrollment);

export const deleteItem = (id) => rest.del(`${url}/${id}`);
