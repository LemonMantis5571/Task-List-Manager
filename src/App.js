
import './App.css';
import TaskNavBar from './Routes/TaskNavBar';

import LoginReducer from './components/login/LoginReducer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import TasksReducer from './components/container/TasksReducer';

function App() {

  return (
    <div className="App">
      <LoginReducer>
        <TasksReducer>
          <ToastContainer />
          <TaskNavBar>
          </TaskNavBar>
        </TasksReducer>
      </LoginReducer>
    </div>
  );
}

export default App;
