import axios from 'axios';
import { API_URL } from "@/constants/main.ts";

const getAdminToken = () => localStorage.getItem('token');
const getClientToken = () => localStorage.getItem('clientToken');

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: getAdminToken() ? `Bearer ${getAdminToken()}` : undefined,
    }
})

export const axiosClientInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: getClientToken() ? `Bearer ${getClientToken()}` : undefined,
    }
})


export const axiosPublicInstance = axios.create({
    baseURL: API_URL,
})