const express = require('express');
const Student = require('../models/models');

const router= express.Router();


//CRUD routes

//Create

router.post('/students', (req, res)=>{ 
    res.send('POST');
});


//Read

// router.get('/students', (req, res)=>{ 
//     res.send('GET');
// });
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

router.patch('/students/:id', (req, res)=>{ 
    res.send('UPDATE');
});

//Delete

router.delete('/students/:id', (req, res)=>{ 
    res.send('DELETE');
});

module.exports= router;
