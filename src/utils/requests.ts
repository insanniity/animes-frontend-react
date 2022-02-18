import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { getAuthData } from "./storage";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'animes';
const CLIENT_SECRET= process.env.REACT_APP_CLIENT_SECRET ?? 'animes123';
const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080/api/v1';

type LoginData = {
    username:string;
    password:string;
}

export const makeRequest = (config: AxiosRequestConfig) => {
    const { access_token } = getAuthData();
    const headers = config.withCredentials ? {
        ...config.headers,
        'Authorization': `Bearer ${access_token}`,
    } : config.headers;
    return axios({...config, baseURL: BASE_URL, headers});
}

export const makeRequestLogin = (loginData: LoginData) => {
    const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${window.btoa(CLIENT_ID+ ':' + CLIENT_SECRET)}`
    }
    const data = qs.stringify({
        ...loginData,
        grant_type: 'password',
    });
    return axios({method: 'POST', baseURL: BASE_URL, url: "/oauth/token" , data, headers})
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // if(error.response.status === 401) history.push('/auth/login');
    return Promise.reject(error);
});