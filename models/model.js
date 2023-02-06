const mongoose = require('mongoose');

//Create the Schema

const studentsSchema = new mongoose.Schema({
    student_no: {
        required: true,
        type: Number,
    },
    first_name: {
        required: true,
        type: String,
    },
    last_name: {
        required: true,
        type: String,
    },
    grade: {
        required: true,
        type: String,
    },
    course: {
        required: false,
        type: String,
        default: "DevOps",
    },
    __v: {
        versionKey: false
    },

});

module.exports = mongoose.model('students', studentsSchema)