import * as rest from './rest';

const url = '/periods';

// eslint-disable-next-line import/prefer-default-export
export const findAll = () => rest.get(url);
