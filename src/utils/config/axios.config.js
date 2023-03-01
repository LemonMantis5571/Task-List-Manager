import axios from "axios";
const token = localStorage.getItem('token');

export default axios.create(
    {
        baseURL: 'https://task-manager-api-production-a08b.up.railway.app/api/',
        responseType: 'json',
        timeout: 5000,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)