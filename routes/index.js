const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).json({ This is the API Landing Page });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;