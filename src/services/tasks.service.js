import axios from "axios";

export const getUserTasks = async () => {
    const token = localStorage.getItem('token');
   
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = axios.get('http://localhost:4001/api/users/id/tasks', config);
    return response;
}

export const DeleteTasks = (id) => {
    const token = localStorage.getItem('token');
   
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }


    return axios.delete(`http://localhost:4001/api/users/id/tasks/${id}`, config);

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
        const response = await axios.post('http://localhost:4001/api/users/create/tasks', body, config); 
        return response.data; // Devuelve la respuesta de la API
    } catch (error) {
        console.log(error);
         // Lanza el error para que pueda ser manejado por el llamador
    }
}