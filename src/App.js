
import './App.css';
import TaskNavBar from './Routes/TaskNavBar';
import TaskContainer, { myContext } from './components/container/TaskContainer';
import LoginReducer from './components/login/loginReducer';


function App() {

  return (
    <div className="App">
      <LoginReducer>
      <TaskContainer>
          <TaskNavBar>
          </TaskNavBar>
      </TaskContainer>
      </LoginReducer>
      

     
      
    </div>
  );
}

export default App;
