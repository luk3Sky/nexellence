import * as rest from './rest';

const url = '/courses';

export const findAll = (queryParams) => rest.get(url, queryParams);

export const findById = (id) => rest.get(`${url}/${id}`);

export const findByTeacher = (id, queryParams) =>
    rest.get(`/teachers/${id}${url}`, queryParams);

export const createItem = (student) => rest.post(url, student);

export const updateItem = (student) => rest.put(url, student);

export const deleteItem = (id) => rest.del(`${url}/${id}`);
