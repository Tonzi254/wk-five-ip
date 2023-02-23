const express = require('express');
const student = require('../models/model');

const router = express.Router();

router.post('/', async (req, res) => {
    const data = new student({
        student_no: req.body.student_no,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        grade: req.body.grade,
    });

    try {
        const saveData = await data.save();
        res.status(201).json(saveData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await student.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {

        const studentRecord = await student.findById(req.params.id);
        if (!studentRecord) { 
            return res.status(404).json({ message: 'No records found with provided id' });
        } 

        let { student_no, first_name, last_name, grade, course } = updatedData;

        // Find the student by it's ID and update it
        studentRecord = await student.findByIdAndUpdate(
            id,
            { student_no, first_name, last_name, grade, course },
            { new: true }
        );

        if (student) {
            res.status(200).json({ message: 'Student record updated successfully', data: student });
        }
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const studentRecord = await student.findById(req.params.id);
        if (!studentRecord) { 
            return res.status(404).json({ message: 'No records found with provided Id' });
        } 

        const dataDelete = await student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Successfully deleted the data', data: dataDelete });
    } catch (error) {
        res.status(400).json({ message: 'Unexpected error occurred while deleting the record.' });
    }
});

module.exports = router;



