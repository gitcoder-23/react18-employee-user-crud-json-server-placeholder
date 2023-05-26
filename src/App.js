// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeList from './pages/EmployeeList';
import EmployeeCreate from './pages/EmployeeCreate';
import EmployeeDetail from './pages/EmployeeDetail';
import EmployeeEdit from './pages/EmployeeEdit';
import UserList from './pages/crudJsonPlace/userlist/UserList';

function App() {
  return (
    <div className="App">
      <h1>ReactJs CRUD Employee App</h1>
      <Routes>
        {/* Using Json-Placeholder */}
        <Route exact path="/userlist" element={<UserList />} />
        {/* Using Json Server */}
        <Route exact path="/" element={<EmployeeList />} />
        <Route exact path="/employee/create" element={<EmployeeCreate />} />
        <Route
          exact
          path="/employee/detail/:empId"
          element={<EmployeeDetail />}
        />
        <Route exact path="/employee/edit/:empId" element={<EmployeeEdit />} />
      </Routes>
    </div>
  );
}

export default App;
