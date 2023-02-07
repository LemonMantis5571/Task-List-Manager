import React, {useReducer, useContext, useEffect,useRef, useState} from 'react';
import Task from '../Task';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList';



export const myContext = React.createContext(null);
export const dispatchActions = React.createContext(null);
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




let initialState = [];
let initialFilterState = 'SHOW_ALL';



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

            return 'SHOW_ALL';

        case 'SHOW_ACTIVE':
            
            return 'SHOW_ACTIVE'

        case 'SHOW_COMPLETED':

            return 'SHOW_COMPLETED'

        default:
            return todos;
    }

}

const filterReducer = (filterstate, action) => {

    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return filterTask(filterstate, action.payload.filter);
        default:
            return filterstate;
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




const TaskContainer = ({children}) => {
        const [state, dispatch] = useReducer(TaskReducer, initialState);
        const [filterstate, filterdispatch] = useReducer(filterReducer, initialFilterState);
        console.log(state);
    return (
        <myContext.Provider value={{state, filterstate}}>
            <dispatchActions.Provider value={{dispatch,filterdispatch}}>
                <ToggleTODO.Provider value={filterstate}>
                    {children}
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
