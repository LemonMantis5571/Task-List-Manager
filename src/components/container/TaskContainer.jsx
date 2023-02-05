import React, {useReducer, useContext, useEffect,useRef, useState} from 'react';
import Task from '../Task';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList';

let TodoId = 0


const myContext = React.createContext(null);
const dispatchActions = React.createContext(null);
const ToggleTODO = React.createContext(null);

export function TaskContext() {
    return useContext(myContext);
}

export function TaskDispatchContext () {
    return useContext(dispatchActions);
}

export function TaskFilterContext() {
    return useContext(ToggleTODO);
}


function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

const initialState = [];
   

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const RESET = 'RESET'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SET_VISIBILITY_FILTER_ALL = 'SET_VISIBILITY_FILTER_ALL'
export const SHOW_ALL = 'SHOW_ALL';

const filterTask = (todos, filter) => {

    switch (filter) {
        case 'SHOW_ALL':
            return todos.filter((todo) => todo);
        case 'SHOW_ACTIVE':
            return todos.filter((todo) => !todo.completed);
        case 'SHOW_COMPLETED':
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }

}


const TaskReducer = (state,action) => {
    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    
                    id: state.length,
                    completed: false,
                    name : action.payload.name,
                    description: action.payload.description
                }
                
            ]

        case DELETE_TASK:
            return state.filter((state, index) =>  index !== action.index);
                
    
        case TOGGLE_COMPLETE:
            return state.map((task, index) => (task.id === action.payload.id) ? {
                ...task,
                completed: !task.completed
            } : task)


        case SET_VISIBILITY_FILTER:
                return filterTask(state, action.payload.filter)

            

        default:
            return state;
    }

}




const TaskContainer = () => {
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    console.log(state); 

    return (
        <myContext.Provider value={state}>
            <dispatchActions.Provider value={dispatch}>
                <ToggleTODO.Provider value={state}>
                    <div>

                        <div>
                            <TaskList></TaskList>
                            {/* <Task></Task> */}
                        </div>

                        <div>
                        <TaskForm></TaskForm>
                        </div>

                    </div>  
                </ToggleTODO.Provider>
            </dispatchActions.Provider>
        </myContext.Provider>
    );
}

export default TaskContainer;
