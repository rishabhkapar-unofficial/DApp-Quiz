const mongoose = require('mongoose');
const Question = mongoose.model(require('../models/question-model').MODEL_NAME);

async function add(question) {
    const newQuestion = new Question(question);
    return await newQuestion.save();
}

async function remove(question_id) {
    return await Question.findByIdAndRemove(question_id).exec();
}

async function update(question_id, newQuestion) {
    return await Question.findByIdAndUpdate(question_id, newQuestion, { new: true }).exec();
}

async function get(question_id) {
    return await Question.findById(question_id).exec();
}

module.exports = { add, remove, update, get };