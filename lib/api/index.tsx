import axios from 'axios';
export * as APIDummy from '../api/dummy';

const INNOFIN_API_HOST = process.env.NEXT_PUBLIC_INNOFIN_API_HOST;
const INNOFIN_API_TOKEN = process.env.NEXT_PUBLIC_INNOFIN_API_TOKEN;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

console.log('InnofinHost', INNOFIN_API_HOST);

const apiHeaders = {
  Authorization: `Bearer ${INNOFIN_API_TOKEN}`,
};

const wooriMZHeaders = {
  'x-api-key': `${API_TOKEN}`,
};

export const apiServer = axios.create({
  baseURL: INNOFIN_API_HOST,
  headers: apiHeaders,
  timeout: 50000,
});

export const wooriMZServer = axios.create({
  baseURL: API_HOST,
  headers: wooriMZHeaders,
  timeout: 50000,
});
