import axios, { CreateAxiosDefaults } from 'axios';
import { coinCapApi, coinCapKey } from 'shared/config';

export const getApi = (baseURL: string, headers?: any) =>
  axios.create({ withCredentials: true, baseURL, headers: headers ?? {} });

export const getCoinApi = () =>
  axios.create({
    baseURL: coinCapApi,
    headers: {
      Authorization: 'Bearer ' + coinCapKey,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
