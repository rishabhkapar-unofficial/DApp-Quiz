const Web3 = require("web3");
const { PROVIDER_URL, QUIZZES_ADDRESS, OWNER } = require("./config");
const Quizzes = require("../abi/quizzes-abi");

const web3 = new Web3(PROVIDER_URL);
const quizzesContract = new web3.eth.Contract(Quizzes.jsonInterface, QUIZZES_ADDRESS);

// Getter Functions
function getQuizDetails(quizId) {
    const quizDetails = callThroughOwner(quizzesContract.methods.getQuizDetails());
    return quizDetails;
}

function getStudentResponse(quizId, studentAddress) {
    const studentResponse = callThroughOwner(quizzesContract.methods.getStudentResponse(quizId, studentAddress));
    return studentResponse;
}

function getNumberOfQuestions(quizId) {
    const numberOfQuestions = callThroughOwner(quizzesContract.methods.getNumberOfQuestions(quizId));
    return numberOfQuestions;
}

function getQuestion(quizId, quesId) {
    const question = callThroughOwner(quizzesContract.methods.getQuestion(quizId, quesId));
    return question;
}

function getTitle(quizId) {
    const title = callThroughOwner(quizzesContract.methods.getTitle(quizId));
    return title;
}

function getLive(quizId) {
    const live = callThroughOwner(quizzesContract.methods.getLive(quizId));
    return live;
}


// Setter Functions
function setTitle(quizId, title) {
    sendThroughOwner(quizzesContract.methods.setTitle(quizId, title));
}

function addQuestion(quizId, jsonQuestion) {
    sendThroughOwner(quizzesContract.methods.addQuestion(quizId, jsonQuestion));
}

function addStudent(quizId, studentAddress) {
    sendThroughOwner(quizzesContract.methods.addStudent(quizId, studentAddress));
}

function setLive(quizId, live) {
    sendThroughOwner(quizzesContract.methods.setLive(quizId, live));
}

// Misc Functions
async function sendThroughOwner(transaction) {
    return await transaction.send({ from: OWNER });
}

async function callThroughOwner(transaction) {
    return await transaction.call({ from: OWNER });
}

module.exports = { getQuizDetails, getLive, getNumberOfQuestions, getQuestion, getStudentResponse, getTitle, setLive, setTitle, addQuestion, addStudent };