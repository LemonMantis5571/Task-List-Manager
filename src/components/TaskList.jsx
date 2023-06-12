import React, { useContext, useEffect, useState } from 'react';
import { getUserTasks } from '../services/tasks.service';
import { dispatchActions, myContext, SET_VISIBILITY_FILTER, FETCH_TASKS_SUCCESS, RESET } from './container/TaskContainer';
import Task from './Task';



const TaskList = () => {


    /* Destructuring the state and filterstate from the context. */
    const { state, filterstate } = useContext(myContext);
    const { dispatch, filterdispatch } = useContext(dispatchActions);
    const completedTasks = state.filter(task => task.completed).length;
    const activeTasks = state.filter(task => !task.completed).length;
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const mapUserTasksToState = (response) => {
            response.data.map((task => {
                return dispatch({
                    type: FETCH_TASKS_SUCCESS, payload: {
                        id: task.id,
                        completed: task.is_completed,
                        name: task.title,
                        description: task.description,
                        priority: task.priority,
                        date: task.expires
                    }
                });
            }));
        }

        dispatch({ type: RESET });
        const fetchUserTasks = async () => {
            const response = await getUserTasks();
            mapUserTasksToState(response);
        }
        fetchUserTasks();

    }, [dispatch]);


    setTimeout(() => {
        setLoading(false);
    }, 1000);

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
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {activeTasks > 0 && (`${activeTasks}`)}
                    </span></button>
            </div>

            {loading && <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            {/* Rendering the table. */}
            <div className='table-responsive'>
                {!loading && <table className='table table-dark w-50 m-auto table-striped '>
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
                                    <Task key={index} task={task} taskID={task.taskID} id={index}>
                                    </Task>
                                );
                            } else {
                                return null;
                            }

                        })}
                    </tbody>
                </table>}
            </div>


        </div>
    );
}

export default TaskList;
