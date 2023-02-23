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
        const dataUpdate = await student.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ success: true, dataUpdate });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'An error occured' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const dataDelete = await student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Successfully deleted the data', data: dataDelete });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;



