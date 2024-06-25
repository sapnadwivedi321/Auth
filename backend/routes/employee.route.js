const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { protect, admin } = require('../middlewares/auth.middleware');

// Get all employees (Client and Admin)
router.get('/', protect, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single employee by ID (Client and Admin)
router.get('/:id', protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new employee (Admin only)
router.post('/', protect, admin, async (req, res) => {
  const { name, position, department, salary } = req.body;

  try {
    const employee = new Employee({
      name,
      position,
      department,
      salary,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an employee (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  const { name, position, department, salary } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name;
    employee.position = position;
    employee.department = department;
    employee.salary = salary;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an employee (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.remove();
    res.json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
