import React, {useContext} from 'react';
import { DELETE_TASK, dispatchActions, myContext, SET_VISIBILITY_FILTER, TaskDispatchContext } from './container/TaskContainer';
import Task from './Task';

const TaskList = () => {
    
    const {state,filterstate} = useContext(myContext);
    const {dispatch, filterdispatch} = useContext(dispatchActions);


    return (
        <div>
            <div className='d-flex gap-5 align-items-center justify-content-center mb-3'>
                <h1>Your Taks</h1>
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
                            filter: 'SHOW_ACTIVE' 
                        }
                    }
                    )}>SHOW ACTIVE</button>
            </div>
            <ul>
                {filterstate === 'SHOW_ALL' ? state.map((task, index) => (
                    <div className='d-flex gap-5' key={index}>
                        <Task key={index} task={{...task}} id={index}>
                        </Task>

                        {task ? (<button className='btn btn-primary' onClick={() => dispatch({type: DELETE_TASK, index})}>DELETE TASK</button>) : null} 
                    </div>


                   
                )) : filterstate === 'SHOW_COMPLETED' ? state.map((task, index) => (
                    <div className='d-flex gap-5' key={index}>
                        <Task key={index} task={task.completed ? {...task} : null} id={index}>
                        </Task>

                        {task.completed ? (<button className='btn btn-primary' onClick={() => dispatch({type: DELETE_TASK, index})}>DELETE TASK</button>) : null} 
                    </div>


                   
                )) :  filterstate === 'SHOW_ACTIVE' ? state.map((task, index) => (
                    <div className='d-flex gap-5' key={index}>
                        <Task key={index} task={!task.completed ? {...task} : null} id={index}>
                        </Task>

                        {!task.completed ? (<button className='btn btn-primary' onClick={() => dispatch({type: DELETE_TASK, index})}>DELETE TASK</button>) : null} 
                    </div>)) : null }
             
            </ul>
        </div>
    );
}

export default TaskList;
