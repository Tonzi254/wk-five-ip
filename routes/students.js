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
      const { id } = req.params;
      const body = req.body;
  
      if (!ObjectID.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
      }
      const updateStudent = await student.findOneAndUpdate({
        _id: id
      }, { $set: body }, { new: true })
  
      if (!updateStudent) {
        return res.status(404).json({ error: 'Unable to update that post' })
      }
  
      res.status(200).json(post)
    } catch (err) {
      res.status(400).send({ error: 'Something went wrong' })
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID')
      }
  
      const deleteStudent = await student.findOneAndRemove({ _id: id})
  
      if (!deleteStudent) {
        return res.status(400).json({ error: 'Unable to delete that post' })
      }
  
      res.status(200).json({ error: 'Post has been removed successfully!' })
    } catch (err) {
      res.status(400).send({ error: 'Something went wrong' })
    }
  });

module.exports = router;



