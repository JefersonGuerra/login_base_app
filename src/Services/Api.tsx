import { API_BASEURL } from '@env'
import axios from 'axios';

const api = axios.create({
    baseURL: API_BASEURL
});

const apiBug = axios.create({
    baseURL: 'https://api1.nsctotal.com.br/api'
});

export {api, apiBug};