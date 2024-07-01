import axios from 'axios';
import { API_URL } from "@/constants/main.ts";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined,
    }
})

export const axiosPublicInstance = axios.create({
    baseURL: API_URL,
})

export const useClientAxiosInstace = () => {
    const token = localStorage.getItem('clientToken');
    const axiosClientInstance = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        }
    })

    return axiosClientInstance;
}