import React, {useReducer} from 'react';

export const loginContext = React.createContext(null);
export const initialState = {
    username: '',
    password: '',
    loggedIn: false

}


export const LOGIN = 'LOGIN';
export const SUCESS = 'SUCESS';
export const ERROR = 'ERROR';
export const LOGOUT = 'LOGOUT';


const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
           return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                
           }
        
        case SUCESS:
           return {
            ...state,
            loggedIn: true
           }

        case LOGOUT:
            break;
        
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
