const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFilePath = path.join(__dirname, '../data/students.json');

// Helper function to read students data
const readStudentsData = () => {
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        return [];
    }
};

// Helper function to write students data
const writeStudentsData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// GET /students - View all students
router.get('/', (req, res) => {
    try {
        const students = readStudentsData();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /students/:id - View student by ID
router.get('/:id', (req, res) => {
    try {
        const students = readStudentsData();
        const student = students.find((s) => s.id === req.params.id);

        if (!student) {
            return res.status(404).json({ error: 'Student Not Found' }); // 404 Not Found[cite: 1, 2]
        }

        res.status(200).json(student); // 200 OK[cite: 2]
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /students - Create a new student[cite: 1, 2]
router.post('/', (req, res) => {
    try {
        const { name, course } = req.body;

        // Handle Invalid Input[cite: 2]
        if (!name || !course) {
            return res.status(400).json({ error: 'Bad Request: Name and Course are required' }); // 400 Bad Request[cite: 1, 2]
        }

        const students = readStudentsData();
        
        // Generate a simple unique ID based on timestamp or length
        const newId = (students.length > 0 ? parseInt(students[students.length - 1].id) + 1 : 1).toString();

        const newStudent = {
            id: newId,
            name,
            course
        };

        students.push(newStudent);
        writeStudentsData(students);

        res.status(201).json({ message: 'New Student Created', student: newStudent }); // 201 Created[cite: 2]
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /students/:id - Update student information[cite: 1, 2]
router.put('/:id', (req, res) => {
    try {
        const { name, course } = req.body;
        const students = readStudentsData();
        const studentIndex = students.findIndex((s) => s.id === req.params.id);

        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student Not Found' }); // 404 Not Found[cite: 1, 2]
        }

        // Validate input fields if provided
        if (!name && !course) {
            return res.status(400).json({ error: 'Bad Request: Provide at least name or course to update' });
        }

        // Update fields if provided
        if (name) students[studentIndex].name = name;
        if (course) students[studentIndex].course = course;

        writeStudentsData(students);

        res.status(200).json({ message: 'Student Updated Successfully', student: students[studentIndex] }); // 200 OK[cite: 2]
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /students/:id - Delete a student[cite: 1, 2]
router.delete('/:id', (req, res) => {
    try {
        const students = readStudentsData();
        const studentIndex = students.findIndex((s) => s.id === req.params.id);

        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student Not Found' }); // 404 Not Found[cite: 1, 2]
        }

        const deletedStudent = students.splice(studentIndex, 1);
        writeStudentsData(students);

        res.status(200).json({ message: 'Student Deleted Successfully', student: deletedStudent[0] }); // 200 OK[cite: 2]
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;