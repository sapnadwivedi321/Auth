import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EmployeeList = ({ handleEdit }) => {
  const { auth,employees, setEmployees } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/employees', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, [setEmployees, auth.token]); 


  if (!employees) {
    return <div>Loading...</div>; // Ensure employees is not undefined
  }
  
  if(employees.length === 0){
    return (  <div> 
            <h1>No employees found</h1>
            </div>
    )}

  return (
    <div>
      {}
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.position} - {employee.department} - ${employee.salary}
            {auth.role === 'admin' && (
              <button onClick={() => handleEdit(employee)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
