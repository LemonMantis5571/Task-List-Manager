import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
import TaskContainer from '../components/container/TaskContainer';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';


const TaskNavBar = () => {
    return (
     <Router>            
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className="container-fluid">
                <Link className="navbar-brand" href='/'>Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/task-form'>Task-Form</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/task-list'>Task-List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled">About</Link>
                        </li>
                    </ul>
               </div>
            </div>
        </nav>
            <Routes>
                <Route exact path='/'></Route>
                <Route  path='/task-form' element={<TaskForm></TaskForm>}></Route>
                <Route  path='/task-list' element={<TaskList></TaskList>}></Route>
            </Routes>
        </Router>
    );
}

export default TaskNavBar;
