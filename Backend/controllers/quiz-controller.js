const mongoose = require('mongoose');
const { isObjectNullOrEmpty } = require('../utilities/misc');
const Quiz = mongoose.model(require('../models/quiz-model').MODEL_NAME);
const Question = mongoose.model(require('../models/question-model').MODEL_NAME);

exports.addQuiz = async function(quiz) {
    const newQuiz = new Quiz(quiz);
    return await newQuiz.save();
}

exports.updateQuiz = async function(quiz_id, quiz) {
    return await Quiz.findByIdAndUpdate(quiz_id, quiz, { new: true }).exec();;
}

exports.removeQuiz = async function(quiz_id) {
    return await Quiz.findByIdAndRemove(quiz_id).exec();
}

async function getQuiz(quiz_id) {
    return await Quiz.findById(quiz_id).exec();;
}

exports.getAllQuizzIds = async function() {
    let quizIds = [];
    const quizzes = await Quiz.find({}).exec();
    quizzes.forEach((quiz) => {
        quizIds.push(quiz._id);
    });

    return quizIds;
}

exports.addQuestion = async function(quiz_id, question) {
    const quiz = await getQuiz(quiz_id);
    quiz.questions.push(new Question(question));
    return await quiz.save();
}

exports.getQuestion = async function(quiz_id, question_id) {
    const quiz = await getQuiz(quiz_id);
    return getQuestionById(quiz, question_id);
}

exports.removeQuestion = async function(quiz_id, question_id) {
    const quiz = await getQuiz(quiz_id);

        for(let i = 0; i < quiz.questions.length; i++) {
            if(question_id == quiz.questions[i]._id) {
                quiz.questions.splice(i, 1);
                break;
            }
        }

    return await quiz.save();
}

exports.updateQuestionVerbose = async function(quiz_id, question_id, verbose) {
    const quiz = await getQuiz(quiz_id);
    const question = getQuestionById(quiz, question_id);
    if(!isObjectNullOrEmpty(question))
        question.verbose = verbose;
    return await quiz.save();
}

exports.updateQuestionOptions = async function(quiz_id, question_id, options) {
    const quiz = await getQuiz(quiz_id);
    const question = getQuestionById(quiz, question_id);
    if(!isObjectNullOrEmpty(question))
        question.options = options;
    return await quiz.save();
}

function getQuestionById(quiz, question_id) {
    for(let i = 0; i < quiz.questions.length; i++) {
        if(quiz.questions[i]._id == question_id)
            return quiz.questions[i];
    }
}

exports.getQuiz = getQuiz;

