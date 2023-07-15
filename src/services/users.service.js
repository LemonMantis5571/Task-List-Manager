import axios from "axios";
import axiosConfig from "../utils/config/axios.config";

export default async function getUserList() {
    const config = await axiosConfig.get('users', {
        validateStatus: function (status) {
            return status < 500
        }
    });

    return config;
}

export const getUser = async () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const response = axios.get('https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/id', config);
    return response;
}

export const createUser = async (user, password) => {

    let body = {
        user: user,
        password: password
    }


    const response = await axiosConfig.post('https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/create', body);
    return response;

}

export const updateUser = async (user, password) => {
    let body = {
        user: user,
        password: password
    }

    try {
        const response = await axiosConfig.patch("https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/update", body);
        return response.data;

    } catch (error) {
        console.log(error);
    }


}

export const deleteUser = async (id) => {

    try {
        const response = await axiosConfig.delete(`https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/delete/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);
    }

}

export const loginUser = async (user, password) => {
    let body = {
        user: user,
        password: password
    }

    const response = await axios.post('https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/login', body);

    return response;
}
