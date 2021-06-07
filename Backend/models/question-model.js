const mongoose = require('mongoose');

const MODEL_NAME = 'question';
const QuestionSchema = new mongoose.Schema({
    verbose: {
        type: String,
        required: true
    },

    options: {
        type: [String],
        // required: true
    }
});

mongoose.model(MODEL_NAME, QuestionSchema);
module.exports = { MODEL_NAME, QuestionSchema };