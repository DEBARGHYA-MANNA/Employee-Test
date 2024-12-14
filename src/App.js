import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeList from './component/EmployeeList';
import EmployeeUpdate from './component/EmployeeUpdate';
import EmployeeCreate from './component/EmployeeCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/update/:id" element={<EmployeeUpdate />} />
        <Route path="/employee/create" element={<EmployeeCreate/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
