const express = require('express');

const router= express.Router();
module.exports= router;

//CRUD routes

//Create

router.post('/students', (req, res)=>{ 
    res.send('POST');
});

//Read

router.get('/students', (req, res)=>{ 
    res.send('GET');
});

//Update

router.patch('/students/:id', (req, res)=>{ 
    res.send('UPDATE');
});

//Delete

router.delete('/students/:id', (req, res)=>{ 
    res.send('DELETE');
});