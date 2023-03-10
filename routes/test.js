//CRUD routes

//Create
router.post('/students', async (req, res) => {
	try {
		let { student_no, first_name, last_name, grade, course } = req.body;
		let _id = mongoose.Types.ObjectId(); // Generating new MongoDB _ID

		Student.create({ _id, student_no, first_name, last_name, grade, course }, (err, student) => {
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
router.get('/students', async (req, res) => {
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
router.patch('/', async (req, res) => {
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


//Delete
/**
 * Delete student
 */
router.delete('/students', async (req, res) => {
	try {
		const _id = req.body._id || null;
		// Remove student by it's _ID
		if (_id) {
			Student.deleteOne({ _id }, err => {
				// Something wrong happens
				if (err) res.status(400).json({ success: false, error: "Can't remove student!" });
				// Everything OK
				res.json({ success: "Student record deleted successfully" });
			});
		} else {
			res.status(400).json({ error: "Identifier required to perform this action!" });
		}
	} catch (e) {
		res.status(401).json({ error: "Unauthorized action!" });
	}
});

module.exports = router;

//CHAT GPT

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        let { student_no, first_name, last_name, grade, course } = updatedData;

        // Find the student by it's ID and update it
        const student = await Student.findByIdAndUpdate(
            id,
            { $set: { student_no, first_name, last_name, grade, course } },
            { new: true }
        );

        // Everything OK
        return res.status(200).json({ success: true, student });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const _id = req.body._id || null;

        if (_id) {
            // Check if student exists
            let existingStudent = await Student.findById(_id);
            if (existingstudent) {
                // Remove student by it's _ID
                Student.deleteOne({ _id }, err => {
                    // Something wrong happens
                    if (err) res.status(400).json({ success: false, error: "Can't remove student!" });
                    // Everything OK
                    res.json({ success: "Student record deleted successfully" });
                });
            } else {
                res.status(400).json({ error: "No valid student found!" });
            }
        } else {
            res.status(400).json({ error: "Identifier required to perform this action!" });
        }
    } catch (e) {
        res.status(401).json({ error: "Unauthorized action!" });
    }
});





router.delete('/', async (req, res) => {
    const id = req.params.id;
    try {
        const dataDelete = await student.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successfully deleted the data', data: dataDelete });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});