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

    const { id } = req.params;
    const body = req.body;

    try {
  
      if (!ObjectID.isValid(id)) {
        return res.status(404).json({ error: 'ID Not Found' });
    }
      const updateStudent = await student.findByIdAndUpdate({_id: id }, { $set: body }, { new: true });
  
      if (!updateStudent) {
        return res.status(404).json({ error: 'Unable to update that Student record' });
    }
      res.status(200).json(updateStudent);
    } catch (error) {
      res.status(400).send({ error: 'Something went wrong' });
    }
  });

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
      if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }
      const deleteStudent = await student.findByIdAndRemove({_id : id});
  
      if (!deleteStudent) {
        return res.status(400).json({ error: 'Unable to delete this Student' });
    }
      res.status(200).json({ message: 'Student has been removed successfully!' });
    } catch (error) {
      res.status(400).send({ error: 'Something went wrong' });
    }
  });

module.exports = router;



