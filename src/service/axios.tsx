import axios from 'axios';

import {apiUri, baseURL} from './apiEndPoints';

const instance = axios.create({
  baseURL: baseURL,
});

export const setAuthInitalToken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default instance;
