// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeList from './pages/EmployeeList';
import EmployeeCreate from './pages/EmployeeCreate';
import EmployeeDetail from './pages/EmployeeDetail';
import EmployeeEdit from './pages/EmployeeEdit';
import UserList from './pages/crudJsonPlace/userlist/UserList';
import UserDetail from './pages/crudJsonPlace/userlist/UserDetail';
import DummyUserList from './pages/dummyJsonApi/DummyUserList';

function App() {
  return (
    <div className="App">
      <h1>ReactJs CRUD Employee/ User App</h1>
      <Routes>
        {/* Using Json Server */}
        <Route exact path="/" element={<EmployeeList />} />
        <Route exact path="/employee/create" element={<EmployeeCreate />} />
        <Route
          exact
          path="/employee/detail/:empId"
          element={<EmployeeDetail />}
        />
        <Route exact path="/employee/edit/:empId" element={<EmployeeEdit />} />

        {/* Using Json-Placeholder */}
        <Route exact path="/userlist" element={<UserList />} />
        <Route exact path="/viewuser/:uId" element={<UserDetail />} />

        {/* Using dummy-Json-Api */}
        <Route exact path="/dummyuserlist" element={<DummyUserList />} />
        {/* <Route exact path="/viewdummyuser/:uId" element={<UserDetail />} /> */}
      </Routes>
    </div>
  );
}

export default App;
