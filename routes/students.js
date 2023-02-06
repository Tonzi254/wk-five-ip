const express = require('express');
const student = require('../models/model');


const router = express.Router();

module.exports = router;

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
    // try {
    //     const id = req.params.id;
    //     const updatedData = req.body;

    //     const data = await student.findByIdAndUpdate(id, updatedData, { new: true });
    //     res.status(200).json(data);
    // } catch (error) {
    //     res.status(404).json({ message: error.message });
    // }

    try {
		let { _id, student_no, first_name, last_name, grade, course } = req.body;

		// Find the student by it's ID and update it
		student.findByIdAndUpdate(
			_id,
			{ $set: { student_no, first_name, last_name, grade, course } },
			{ new: true },
			(error, student) => {
				// Something wrong happens
				if (err) res.status(400).json({ success: false, error: "Can't update student!" });
				// Everything OK
				res.status(200).json({ success: true, student });
			}
		);
	} catch (error) {
		res.status(401).json({ error: "Unauthorized action!" });
	}
});

router.delete('/id', async (req, res) => {

    try {
        const id = req.params.id;

        const data = await student.findByIdAndDelete(id);
        res.status(204).json({ message: `The student named ${data.first_name} ${data.last_name} has been deleted` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});




