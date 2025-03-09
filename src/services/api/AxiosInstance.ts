import axios from "axios";

export const userApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL
})