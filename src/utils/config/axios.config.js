import axios from "axios";
const token = localStorage.getItem('token');

export default axios.create(
    {
        baseURL: 'https://task-manager-api-g497.vercel.app/api/',
        responseType: 'json',
        timeout: 5000,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)