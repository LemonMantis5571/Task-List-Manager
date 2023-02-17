import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import HomePage from '../Pages/HomePage';


const TaskNavBar = () => {
    return (
     <Router>            
        <nav className='navbar justify-content-center navbar-expand-md bg-dark' data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href='/'>Task-Manager</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-3">
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
               <div className="navbar-brand nav-item dropdown ">
                    <i className="nav-link dropdown-toggle" role='button' data-bs-toggle="dropdown" aria-expanded="false">
                        <i className='bi bi-person-circle'></i>
                    </i>

                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><Link className="dropdown-item" href="/">Create Account</Link></li>
                        <li><Link className="dropdown-item" href="/">Login</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" href="/">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
            <Routes>
                <Route exact path='/' element={<HomePage></HomePage>}></Route>
                <Route  path='/task-form' element={<TaskForm></TaskForm>}></Route>
                <Route  path='/task-list' element={<TaskList></TaskList>}></Route>
            </Routes>
        </Router>
    );
}

export default TaskNavBar;
