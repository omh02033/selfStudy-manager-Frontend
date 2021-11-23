import axios from 'axios';
import { setCookie, removeCookie } from '../components/cookie';

const api = axios.create({
    withCredentials: true
});

api.interceptors.request.use((config) => {
    if(localStorage.getItem('token')) {
        setCookie('token', localStorage.getItem('token') as string);
    }
    return config;
});

api.interceptors.response.use((data) => {
    removeCookie('token');
    return data;
})

export default api;