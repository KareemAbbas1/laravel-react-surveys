import axios from "axios";
// eslint-disable-next-line no-unused-vars
import router from "./router";


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
    return config
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('TOKEN');
        // localStorage.removeItem('USER');
        window.location.reload();
        // router.navigate('/login');
        return error;
    }
    throw error;
})

export default axiosClient;