import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EmployeeForm = ({ employee, setEmployee, isEdit, setIsEdit }) => {
  const [formData, setFormData] = useState({
    name: employee ? employee.name : "",
    position: employee ? employee.position : "",
    department: employee ? employee.department : "",
    salary: employee ? employee.salary : "",
  });
  const { auth } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:8000/api/employees/${employee._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setIsEdit(false);
      } else {
        await axios.post("http://localhost:8000/api/employees", formData, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
      }
      setEmployee(null);
      setFormData({ name: "", position: "", department: "", salary: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Salary:</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{isEdit ? "Update" : "Add"} Employee</button>
    </form>
  );
};

export default EmployeeForm;
