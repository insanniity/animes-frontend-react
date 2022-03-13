import { AxiosRequestConfig } from "axios"
import { API } from "./api"


export const AnimeService =  {
    findAll: (params?: AxiosRequestConfig) => {
       return API.get("/animes", params);
    },
    findById: (id: number, params?: AxiosRequestConfig) => {
        return API.get(`/animes/${id}`, params);
    },
    create: (data: any, params?: AxiosRequestConfig) => {
        return API.post("/animes", data, params);
    },
    update: (id: number, data: any, params?: AxiosRequestConfig) => {
       return API.put(`/animes/${id}`, data, params);
    },
    delete: (id: number, params?: AxiosRequestConfig) => {
         return API.delete(`/animes/${id}`, params);
     }
}