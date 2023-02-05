import React, {useContext, useReducer} from 'react';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const myContext = React.createContext(null);

const Points = () => {

    const state = useContext(myContext);

    return (
        <div>
            Counter: { state.count }
        </div>
        
    )
}


const Counter = () => {

    const initialState = {
        count: 0
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case INCREMENT:
                return {
                    ...state,
                    count: state.count + action.payload.quantity
                }
            
            case DECREMENT: 
                return {
                    ...state,
                    count: state.count - action.payload.quantity
                }
            
            case RESET:
                return {
                    ...state,
                    count: 0
                }
                
        
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);



    return (
        <myContext.Provider value={state}>
            <div>
                <Points></Points>
                <button onClick={
                    () => dispatch({type: INCREMENT, 
                    payload: {
                        quantity: 2
                    }})
                }>
                    INCREMENT
                </button>
                <button onClick={
                    () => dispatch({type: DECREMENT, 
                    payload: {
                        quantity: 1
                    }})
                }>
                    DECREMENT
                </button>   
                <button onClick={
                    () => dispatch({type: RESET})
                }>
                    RESET
                </button>   
            </div>
        </myContext.Provider>
        
    );
}

export default Counter;
