const express = require('express');
const Student = require('../models/models');
const mongoose= require('mongoose');

const router= express.Router();


//CRUD routes

//Create
router.post('/students', (req, res) => {
	try {
		let { student_no, first_name, last_name, grade, course } = req.body;
		let _id = mongoose.Types.ObjectId(); // Generating new MongoDB _ID

		Student.create({_id,student_no,first_name, last_name,grade, course }, (err, student) => {
			// Error returned
			if (err) res.status(400).json({ error: "Invalid request, something went wrong!", err });
			// Everything OK
			res.status(201).json({ success: true, student });
		});
	} catch (e) {
		res.status(401).json({ error: "Unauthorized action!" });
	}
});


//Read

/**
 * Find all students
 */
router.get('/students', (req, res) => {
	try {
		Student.find({}, (err, students) => {
			// Error returned
			if (err) res.status(400).json({ error: "Invalid request, something went wrong!" });
			// Invalid data received
			if (!students) res.status(401).json({ error: "Unauthorized action!" });
			// Everything OK
			res.json({ success: true, students });
		});
	} catch (e) {
		res.status(401).json({ error: "Unauthorized action!" });
	}
})


//Update

/**
 * Update student
 */
router.put('/students', (req, res) => {
	try {
		let {_id,student_no, first_name, last_name, grade, course } = req.body;

		// Find the student by it's ID and update it
		Student.findByIdAndUpdate(
			_id,
			{ $set: { student_no, first_name, last_name, grade, course }},
			{ new: true },
			(err, student) => {
				// Something wrong happens
				if (err) res.status(400).json({ success: false, error: "Can't update student!" });
				// Everything OK
				res.json({ success: true, student });
			}
		);
	} catch (e) {
		res.status(401).json({ error: "Unauthorized action!" });
	}
});


//Delete
/**
 * Delete student
 */
router.delete('/students', (req, res) => {
	try {
		const _id = req.body._id || null;
		// Remove student by it's _ID
		if (_id) {
			Student.deleteOne({ _id }, err => {
				// Something wrong happens
				if (err) res.status(400).json({ success: false, error: "Can't remove student!" });
				// Everything OK
				res.json({ success: "Student record deleted successfully"});
			});
		} else {
			res.status(400).json({ error: "Identifier required to perform this action!" });
		}
	} catch (e) {
		res.status(401).json({ error: "Unauthorized action!" });
	}
});

module.exports= router;
