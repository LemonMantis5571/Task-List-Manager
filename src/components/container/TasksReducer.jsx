import React, { useReducer, useContext } from 'react';

export const myContext = React.createContext(null);
export const dispatchActions = React.createContext(null);

export function TaskDispatchContext() {
    return useContext(dispatchActions);
}


let initialState = [];
let initialFilterState = 'SHOW_ALL';

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SHOW_ALL = 'SHOW_ALL';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const RESET = 'RESET'

/**
 * The filterReducer function takes in two arguments, the filterstate and the action, and returns the
 * filterstate if the action type is not SET_VISIBILITY_FILTER, otherwise it returns the filterTask
 * function with the filterstate and the action payload filter as arguments.
 * @returns The return value of the reducer is the new state.
 */
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


/* A reducer function that takes in two arguments, the state and the action, and returns the state if
the action type is not ADD_TASK, DELETE_TASK, TOGGLE_COMPLETE, or SET_VISIBILITY_FILTER, otherwise
it returns the appropriate function with the state and the action payload as arguments. */
const TaskReducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return [...state, {
                completed: true
            }]

        case DELETE_TASK:
            return state.filter((task) => (task.stateID !== action.payload.stateID));


        case TOGGLE_COMPLETE:
            return state.map((task) => (task.stateID === action.payload.id) ? {
                ...task,
                completed: !task.completed
            } : task)


        case SET_VISIBILITY_FILTER:
            return filterTask(state, action.payload.filter)


        case FETCH_TASKS_SUCCESS:
            const date = new Date(action.payload.date);
            const formattedDate = date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
            return [
                ...state,
                {
                    id: action.payload.id,
                    stateID: state.length,
                    completed: action.payload.completed,
                    name: action.payload.name,
                    description: action.payload.description,
                    priority: action.payload.priority,
                    date: formattedDate
                }
            ]

        case RESET:
            return initialState;

        default:
            return state;
    }

}


const TasksReducer = (props) => {
    const [state, dispatch] = useReducer(TaskReducer, initialState);
    const [filterstate, filterdispatch] = useReducer(filterReducer, initialFilterState);


    return (
        <myContext.Provider value={{ state, filterstate }}>
            <dispatchActions.Provider value={{ dispatch, filterdispatch }}>
                {props.children}
            </dispatchActions.Provider>
        </myContext.Provider>
    );
}

export default TasksReducer;
