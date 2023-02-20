import React, {useContext} from 'react';
import { DELETE_TASK, dispatchActions, TOGGLE_COMPLETE } from './container/TaskContainer';

const Task = ({task, id}) => {

    const {dispatch} = useContext(dispatchActions);
    console.log(task.date);

    return (    
        <tr onClick={() => dispatch({type: TOGGLE_COMPLETE, payload: {id: id}})} className = {task.completed ? 'table-success' : 'table-danger'}>
        <th scope='row'>{task.id}</th>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td>
            {task.completed ? 'Completed' : 'Incompleted'}
        </td>
        <td>{task.priority}</td>
        <td><button className='btn btn-danger' onClick={() => dispatch({type: DELETE_TASK, id})}>DELETE TASK</button></td>
        <td>{task.date.toString()}</td>

    </tr>
    );
}

export default Task;

