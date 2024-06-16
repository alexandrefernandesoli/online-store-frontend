import axios from 'axios';
import { API_URL } from "@/constants/main.ts";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined,
    }
});