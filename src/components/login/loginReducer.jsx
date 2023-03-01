import React, {useReducer} from 'react';

export const loginContext = React.createContext(null);
export const initialState = {
    loggedIn: false

}


export const LOGIN = 'LOGIN';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const LOGOUT = 'LOGOUT';


const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
           return {
                ...state,
                id: action.payload.id,
                user: action.payload.user,
                
           }
        
        case SUCCESS:
           return {
            ...state,
            loggedIn: true
           }

        case LOGOUT:
            return {
                ...state,
                loggedIn: false
            }
        
        case ERROR:
            break;
    
        default:
            break;
    }
}



const LoginReducer = (props) => {

    const [loginState, loginDispatch] = useReducer(loginReducer, initialState);

    return (
        <loginContext.Provider value={{loginState, loginDispatch}}>
                {props.children}
        </loginContext.Provider>
    );
}

export default LoginReducer;
