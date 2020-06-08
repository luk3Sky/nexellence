import * as rest from './rest';

const url = 'http://localhost:5000/students';

export const findAll = (sort) => rest.get(url, { sort });

export const findByName = (name) => rest.get(url, { name });

export const findById = (id) => rest.get(`${url}/${id}`);

export const createItem = (student) => rest.post(url, student);

export const updateItem = (student) => rest.put(url, student);

export const deleteItem = (id) => rest.del(`${url}/${id}`);
