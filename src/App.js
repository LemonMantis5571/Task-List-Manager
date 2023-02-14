
import './App.css';
import TaskNavBar from './Routes/TaskNavBar';
import TaskContainer, { myContext } from './components/container/TaskContainer';

function App() {

  return (
    <div className="App">
      <TaskContainer>
        <TaskNavBar>
        </TaskNavBar>
      </TaskContainer>
      
    </div>
  );
}

export default App;
