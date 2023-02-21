import React, {useContext} from 'react';
import {dispatchActions, myContext, SET_VISIBILITY_FILTER} from './container/TaskContainer';
import Task from './Task';

const TaskList = () => {
    
/* Destructuring the state and filterstate from the context. */
    const {state,filterstate} = useContext(myContext);
    const {dispatch, filterdispatch} = useContext(dispatchActions);
    const completedTasks = state.filter(task => task.completed).length;
    const activeTasks = state.filter(task => !task.completed).length;

    return (
        /* A button group that filters the tasks. */
        <div>
            <div className='d-flex gap-5 align-items-center justify-content-center mb-3 mt-3'>
                <button className='btn btn-primary position-relative' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_COMPLETED',
                        }

                    })}>SHOW COMPLETE 
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {completedTasks > 0 && `${completedTasks}`}
                        </span>
                    </button>

                <button className='btn btn-primary position-relative' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_ALL',
                        }
                    }
                    )}>SHOW ALL 
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {state.length}
                        </span></button>

                <button className='btn btn-primary position-relative' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_ACTIVE',
                        }
                    }
                    )}>SHOW ACTIVE 
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {activeTasks > 0 && (`${activeTasks}`)}
                        </span></button>
            </div>

            {/* Rendering the table. */}
            <table className='table table-dark table-striped w-50 m-auto align-middle'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Task Name</th>
                        <th scope='col'>Details</th>
                        <th scope='col'>State</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                        <th scope='col'>Expire Date</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((task, index) => {
                        if ((filterstate === 'SHOW_ALL') || (filterstate === 'SHOW_COMPLETED' && task.completed) || (filterstate === 'SHOW_ACTIVE' && !task.completed)) {
                            return (
                                    
                                        <Task key={index} task={task} id={index}>
                                        </Task>
                                        
                                    );
                        }
                            return null;
                        })}
                </tbody>
            </table>
            
        </div>
    );
}

export default TaskList;
