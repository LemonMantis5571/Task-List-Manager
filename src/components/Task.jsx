import React, {useContext} from 'react';
import { DeleteTasks} from '../services/tasks.service';
import { DELETE_TASK, dispatchActions, TOGGLE_COMPLETE } from './container/TaskContainer';

/**
 * Task is a function that takes in a task and an id and returns a table row with the task's name,
 * description, completion status, priority, and date.
 * @returns A function that returns a component.
 */
const Task = ({task, taskID , id }) => {
    const {dispatch} = useContext(dispatchActions);

    const handleDeleteTask = async (taskID) => {
        dispatch({ type: DELETE_TASK, payload: { id: id} });
        try {
            await DeleteTasks(taskID);
           
        } catch (error) {
            console.log(error);
        }
    }

    return (    
        <tr onClick={() => dispatch({type: TOGGLE_COMPLETE, payload: {id: id}})} className = {task.completed ? 'table-success' : 'table-danger'}>
        <th scope='row'>{task.id + 1}</th>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td>
            {task.completed ? 'Completed' : 'Incompleted'}
        </td>
        <td>{task.priority}</td>
        <td><button className='btn btn-danger py-1 aling-self-center' onClick={() => handleDeleteTask(taskID)}>X</button></td>
        <td>{task.date}</td>

    </tr>
    );
}

export default Task;

