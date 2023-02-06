const express = require('express');

const student = require ('../models/model');


const router = express.Router();

module.exports = router;

router.post('/', async (req, res) => {
    const data = new student({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
		grade: req.body.grade,
		course: req.body.course,
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

        console.log(id)
        console.log(updatedData)
    
        const data = await student.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const data = await student.findByIdAndDelete(id);
        res.status(200).json({message: `The student named ${data.first_name} ${data.last_name} has been deleted`});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




