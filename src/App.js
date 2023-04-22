// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeList from './pages/EmployeeList';

function App() {
  return (
    <div className="App">
      <h1>ReactJs CRUD Employee App</h1>
      <Routes>
        <Route exact path="/" element={<EmployeeList />} />
      </Routes>
    </div>
  );
}

export default App;
