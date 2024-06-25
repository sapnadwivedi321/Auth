import React, { useState, useContext } from 'react';
import EmployeeList from '../component/EmployeeList';
import EmployeeForm from '../component/EmployeeForm';
import { AuthContext } from '../context/AuthContext';


const AdminDashboard = () => {
  // const { employees } = useContext(EmployeeContext);
  const {employee} = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  const [newEmployee,setNewEmployee] = useState(null)
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (employee) => {
    setNewEmployee(employee);
    setIsEdit(true);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {auth.role === 'admin' && (
        <EmployeeForm employee={newEmployee} setEmployee={setNewEmployee} isEdit={isEdit} setIsEdit={setIsEdit} />
      )}
      <EmployeeList handleEdit={handleEdit} />
    </div>
  );
};

export default AdminDashboard;
