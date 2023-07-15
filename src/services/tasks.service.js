import axios from "axios";

export const getUserTasks = async () => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = axios.get('https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/id/tasks', config);
    return response;
}

export const DeleteTasks = (id) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }


    return axios.delete(`https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/id/tasks/${id}`, config);

}

export const CreateTask = async (title, description, completed, priority, expires) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = {
        title: title,
        description: description,
        is_completed: completed,
        priority: priority,
        expires: expires
    }

    try {
        const response = await axios.post('https://task-manager-mjsgqfln4-lemonmantis5571.vercel.app/api/users/create/tasks', body, config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}