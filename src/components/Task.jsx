import React, {useContext} from 'react';
import { dispatchActions, TaskContext, TaskDispatchContext, TOGGLE_COMPLETE } from './container/TaskContainer';

const Task = ({task, id}) => {

    const {dispatch} = useContext(dispatchActions);


    return (
        <li onClick={() => dispatch({type: TOGGLE_COMPLETE, payload: { id: id} })} style= {
            {
                textDecoration: task?.completed ? 'line-through': 'none',
                textDecorationColor: task?.completed ? 'green' : 'none',
                color: task?.completed ? 'green' : 'white'  
            }}>
            <div className='d-flex gap-3'>
                <p>ID: {task?.id}</p>
                <p>Name: {task?.name}</p>
                <p>Description:{task?.description}</p>

            </div>
                
        </li>
    );
}

export default Task;

