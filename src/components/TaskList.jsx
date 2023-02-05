import React from 'react';
import { DELETE_TASK, SET_VISIBILITY_FILTER, SET_VISIBILITY_FILTER_COMPLETED, TaskContext, TaskDispatchContext } from './container/TaskContainer';
import Task from './Task';

const TaskList = () => {
    
    const tasks = TaskContext();
    const dispatch = TaskDispatchContext();
    return (
        <div>
            <div className='d-flex gap-5 align-items-center justify-content-center mb-3'>
                <h1>Your Taks</h1>
                <button className='btn btn-primary' onClick={() => dispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_COMPLETED'
                        }
                    })}>SHOW COMPLETE</button>

                <button className='btn btn-primary' onClick={() => dispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_ALL' 
                        }
                    }
                    )}>SHOW ALL</button>

                <button className='btn btn-primary' onClick={() => dispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_ACTIVE' 
                        }
                    }
                    )}>SHOW ACTIVE</button>
            </div>
            
            <ul>
                {tasks && tasks.map((task, index) => (
                    <div className='d-flex gap-5' key={index}>
                        <Task key={index} task={{...task}} id={index}>
                        </Task>

                        <button className='btn btn-primary' onClick={() => dispatch({type: DELETE_TASK, index})}>DELETE TASK</button>
                    </div>

                   
                ))}
             
            </ul>
        </div>
    );
}

export default TaskList;
