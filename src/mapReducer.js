import React from 'react';
import { DELETE_TASK } from './components/container/TaskContainer';
import Task from './components/Task';

function MapState(state,dispatch ) {  
    console.log(state);
    return (state.map((task, index) => (
            <div className='d-flex gap-5' key={index}>
                <Task key={index} task={{...task}} id={index}>
                </Task>

                <button className='btn btn-primary' onClick={() => dispatch({type: DELETE_TASK, index})}>DELETE TASK</button>
            </div>)))

}


export default MapState;
