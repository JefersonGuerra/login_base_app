import { API_BASEURL } from '@env'
import axios from 'axios';

const api = axios.create({
    baseURL: API_BASEURL
});

export {api};