const express = require('express');

const students = require ('./../models/models');


const router = express.Router();


router.post('/', async function (req, res) {
    const studentsData = new students({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
		grade: req.body.grade,
		course: req.body.course,
    });

    try {
        const saveData = await data.save();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async function (req, res) {
    try {
        const data = await students.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async function (req, res) {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(id)
    console.log(updatedData)

    try {
        const dataUpdate = await students.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(dataUpdate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const dataDelete = await students.findByIdAndDelete(id);
        res.status(200).json(dataDelete);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;



