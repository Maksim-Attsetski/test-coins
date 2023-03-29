import axios, { CreateAxiosDefaults } from 'axios';

export const getApi = (baseURL: string, headers?: any) =>
  axios.create({ withCredentials: true, baseURL, headers: headers ?? {} });

export const getCoinApi = () =>
  axios.create({
    baseURL: 'https://api.coincap.io/v2/',
    headers: {
      Authorization: 'Bearer c9d23913-8965-4fc2-8ec9-e7e5f54757fc',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
