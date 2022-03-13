import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { getAuthData } from "utils/storage";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'animes';
const CLIENT_SECRET= process.env.REACT_APP_CLIENT_SECRET ?? 'animes123';
const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080/api/v1';

type LoginData = {
    username:string;
    password:string;
}

export const API = {
    login: (loginData:LoginData) => {
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${window.btoa(CLIENT_ID+ ':' + CLIENT_SECRET)}`
        }
        const data = qs.stringify({
            ...loginData,
            grant_type: 'password',
        });
        return axios({method: 'POST', baseURL: BASE_URL, url: "/oauth/token" , data, headers})
    },
    get: (url:string, config?:AxiosRequestConfig) => {
        return axios({method: 'GET', baseURL: BASE_URL, url, headers: {'Authorization': 'Bearer ' + getAuthData().access_token}, ...config})
    },
    post: (url:string, data:any, config?:AxiosRequestConfig) => {
        return axios({method: 'POST', baseURL: BASE_URL, url, data, headers: {'Authorization': 'Bearer ' + getAuthData().access_token}, ...config})
    },
    put: (url:string, data:any, config?:AxiosRequestConfig) => {
        return axios({method: 'PUT', baseURL: BASE_URL, url, data, headers: {'Authorization': 'Bearer ' + getAuthData().access_token}, ...config})
    },
    delete: (url:string, config?:AxiosRequestConfig) => {
        return axios({method: 'DELETE', baseURL: BASE_URL, url, headers: {'Authorization': 'Bearer ' + getAuthData().access_token}, ...config})
    }
}