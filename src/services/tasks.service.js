import axios from "axios";

export const getUserTasks = () => {
    const token = localStorage.getItem('token');
   
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    return axios.get('https://task-manager-api-production-a08b.up.railway.app/api/users/id/tasks', config);
}

export const DeleteTasks = (id) => {
    const token = localStorage.getItem('token');
   
    const config = {
        Headers: {
            'Authorization': `Bearer ${token}`
        }
    }


    return axios.delete(`https://task-manager-api-production-a08b.up.railway.app/api/users/id/tasks/${id}`, config);

}