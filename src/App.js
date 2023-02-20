
import './App.css';
import TaskNavBar from './Routes/TaskNavBar';
import TaskContainer, { myContext } from './components/container/TaskContainer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
function App() {

  return (
    <div className="App">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TaskContainer>
          <TaskNavBar>
          </TaskNavBar>
      </TaskContainer>
    </LocalizationProvider>
     
      
    </div>
  );
}

export default App;
