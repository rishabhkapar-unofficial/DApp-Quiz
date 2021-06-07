const mongoose = require('mongoose');
const QuestionSchema = require('./question-model').QuestionSchema;

const MODEL_NAME = 'quiz';
const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    questions: {
        type: [QuestionSchema]
    }
});

mongoose.model(MODEL_NAME, QuizSchema);
module.exports = { MODEL_NAME };