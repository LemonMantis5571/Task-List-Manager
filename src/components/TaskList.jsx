import React, {useContext} from 'react';
import {dispatchActions, myContext, SET_VISIBILITY_FILTER} from './container/TaskContainer';
import Task from './Task';

const TaskList = () => {
    
    const {state,filterstate} = useContext(myContext);
    const {dispatch, filterdispatch} = useContext(dispatchActions);


    return (
        <div>
            <div className='d-flex gap-5 align-items-center justify-content-center mb-3 mt-3'>
                <button className='btn btn-primary' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_COMPLETED',
                        }

                    })}>SHOW COMPLETE</button>

                <button className='btn btn-primary' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_ALL',
                        }
                    }
                    )}>SHOW ALL</button>

                <button className='btn btn-primary' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                        payload: {
                            filter: 'SHOW_ACTIVE',
                        }
                    }
                    )}>SHOW ACTIVE</button>
            </div>
            <table className='table table-dark table-striped w-50 m-auto'>
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
                                        /* <button className='btn btn-primary' onClick={() => dispatch({type: DELETE_TASK, index})}>DELETE TASK</button> */
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
