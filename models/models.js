const mongoose= require('mongoose');

//Create the Schema

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student_no: {
        required: true,
        type: String,
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
        type: String
    },

});

module.exports = mongoose.model('Student', studentSchema)