import axios from "axios";
import axiosConfig from "../utils/config/axios.config";

export default async function getUserList() {
    return await axiosConfig.get('users', {
        validateStatus: function (status) {
            return status < 500
        }
    })
}
const timestamp = new Date().getTime();

export const getUser = async() => {

    try {

        const response = await axiosConfig.get(`users/id?timestamp=${timestamp}`);
        return response;

    } catch (error) {
        console.log(error)
    }
    
    
}

export const createUser = async(user, password) => {

    let body = {
        user: user,
        password: password
    }

    
    const response = await axiosConfig.post('users/create', body);
    return response;

}

export const updateUser = async(user, password) => {
    let body = {
        user: user,
        password: password
    }

    try {
        const response = await axiosConfig.patch("users/update/", body);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }

   
}

export const deleteUser = async(id) => {

    try {
        const response = await axiosConfig.delete(`users/delete/${id}`);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
   
}

export const loginUser = async(user, password) => {
    let body = {
      user: user,
      password: password
    }
 
    const response = await axios.post('https://task-manager-api-production-a08b.up.railway.app/api/users/login', body);

    return response;
  
  
}
