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

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const studentData = await student.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(studentData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const studentData = await student.findByIdAndDelete(id);
        await res.status(204).json({ message: `The student named ${studentData.first_name} ${studentData.last_name} has been deleted` });
    } catch (error) {
        await res.status(400).json({ message: error.message });
    }
});

module.exports = router;



