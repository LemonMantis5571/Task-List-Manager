import React, {useContext} from 'react';
import { DELETE_TASK, dispatchActions, myContext, SET_VISIBILITY_FILTER} from './container/TaskContainer';
import Task from './Task';

const TaskList = () => {
    
    const {state,filterstate} = useContext(myContext);
    const {dispatch, filterdispatch} = useContext(dispatchActions);


    return (
        <div>
            <div className='d-flex gap-5 align-items-center justify-content-center mb-3'>
                <h1>Your Tasks</h1>
                <button className='btn btn-primary' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,

                    })}>SHOW COMPLETE</button>

                <button className='btn btn-primary' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                    }
                    )}>SHOW ALL</button>

                <button className='btn btn-primary' onClick={() => filterdispatch(
                    {
                        type: SET_VISIBILITY_FILTER,
                    }
                    )}>SHOW ACTIVE</button>
            </div>
            <ul>
                {state.map((task, index) => {
                    if ((filterstate === 'SHOW_ALL') || (filterstate === 'SHOW_COMPLETED' && task.completed) || (filterstate === 'SHOW_ACTIVE' && !task.completed)) {
                        return (
                                <div className='d-flex gap-5' key={index}>
                                <Task key={index} task={task} id={index} />
                                <button className='btn btn-primary' onClick={() => dispatch({type: DELETE_TASK, index})}>DELETE TASK</button>
                                </div>
                                );
                    }
                        return null;
                    })}
            </ul>
        </div>
    );
}

export default TaskList;
