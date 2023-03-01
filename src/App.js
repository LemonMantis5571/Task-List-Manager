
import './App.css';
import TaskNavBar from './Routes/TaskNavBar';
import TaskContainer, { myContext } from './components/container/TaskContainer';
import LoginReducer from './components/login/loginReducer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
      <LoginReducer>
      <TaskContainer>
          <ToastContainer/>
          <TaskNavBar>
          </TaskNavBar>   
      </TaskContainer>
      </LoginReducer>
      

     
      
    </div>
  );
}

export default App;
