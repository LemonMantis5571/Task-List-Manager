import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import HomePage from '../Pages/HomePage';
import { toast } from 'react-toastify';
import { LOGOUT, loginContext } from '../components/login/loginReducer';
import LoginForm from '../components/login/loginForm';
import RegisterForm from '../components/login/registerForm';



const TaskNavBar = () => {
    const { loginState, loginDispatch } = useContext(loginContext);

    const logoutFunc = () => {
        loginDispatch({ type: LOGOUT });
        localStorage.removeItem('token');
        notifySuccess('Logged out successfully');
    }


    const notifySuccess = (message) => {
        toast.success(message, {
            render: message,
            type: 'success',
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            isLoading: false
        });
    }

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Task Manager</Link>
                    {loginState.loggedIn ? (<p className='m-auto position-relative text-capitalize' style={{ color: 'white' }}>Welcome {loginState.user}</p>) : null}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {loginState.loggedIn ? (<li className="nav-item">
                                <Link className="nav-link" to='/task-form'>Task-Form</Link>
                            </li>) : null}

                            {loginState.loggedIn ? (<li className="nav-item">
                                <Link className="nav-link" to='/task-list'>Task-List</Link>
                            </li>) : null}

                            <li className="nav-item">
                                <Link className="nav-link" to="https://github.com/LemonMantis5571/Task-List-Manager" tabIndex="-1" aria-disabled="true" target='_blank'>About</Link>
                            </li>
                        </ul>

                        <div className="navbar-brand nav-item dropdown ">
                            <i className="nav-link dropdown-toggle" role='button' data-bs-toggle="dropdown" aria-expanded="false">
                                <i className='bi bi-person-circle'></i>
                            </i>

                            <ul className="dropdown-menu dropdown-menu-end">

                                {loginState.loggedIn ? null : (<li><Link className="dropdown-item" to='/register'>Create Account</Link></li>)}

                                {loginState.loggedIn ? (<li><Link className="dropdown-item" to="/">Profile</Link></li>)
                                    : (<li><Link className="dropdown-item" to="/login">Login</Link></li>)}

                                {loginState.loggedIn ? (<div><li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={() => logoutFunc()} to='/'>Logout</Link></li> </div>) : null}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route exact path='/' element={<HomePage></HomePage>}></Route>
                <Route path='/login' element={<LoginForm/>}></Route>
                <Route path='/register' element={loginState.loggedIn ? <Navigate to='/login' /> : <RegisterForm/>}></Route>
                <Route path='/task-form' element={loginState.loggedIn ? <TaskForm></TaskForm> : <Navigate to='/login' />} ></Route>
                <Route path='/task-list' element={loginState.loggedIn ? <TaskList></TaskList> : <Navigate to='/login' />}></Route>
            </Routes>
        </Router>
    );
}

export default TaskNavBar;
