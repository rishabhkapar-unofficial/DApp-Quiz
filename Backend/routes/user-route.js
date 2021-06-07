const router = require('express').Router();
const quizController = require('../controllers/quiz-controller');
const { isStringNullOrEmpty, isObjectNullOrEmpty, isArrayNullOrEmpty } = require('../utilities/misc');

const QUIZ_TITLE_REQ_MSG = 'Quiz title can not be empty.';
const INTERNAL_ERROR_MSG = 'Some internal error has occured.';
const INVALID_DATA_MSG = 'Invalid data.';

router.get('/quizzes', async (req, res) => {
    try {
        const data = await quizController.getAllQuizzIds();
        return res.json({ success: true, quizIds: data });
    } catch(e) {
        console.log(e);
        return res.json({ success: false, message: INTERNAL_ERROR_MSG });
    }
});

router.get('/quizzes/:id', async (req, res) => {
    try {
        const quiz = await quizController.getQuiz(req.params.id);
        return res.json({ success: true, quiz: quiz });
    } catch(e) {
        console.log(e);
        return res.json({ success: false, message: INTERNAL_ERROR_MSG });
    }
});

router.post('/quizzes', async (req, res) => {
    if(isObjectNullOrEmpty(req.body) || isStringNullOrEmpty(req.body.title))
        return res.json({ success: false, message: QUIZ_TITLE_REQ_MSG });
    try {
        const quiz = await quizController.addQuiz(req.body);
        return res.json({ success: true, quiz: quiz});
    } catch(e) {
        console.log(e);
        return res.json({ success: false, message: INTERNAL_ERROR_MSG });
    }
});

router.post('/quizzes/:id/questions', async (req, res) => {
    console.log(req.body);
    if(isObjectNullOrEmpty(req.body) || isStringNullOrEmpty(req.body.verbose) || isArrayNullOrEmpty(req.body.options))
        return res.json({ success: false, message: INVALID_DATA_MSG });
    try {
        const question = await quizController.addQuestion(req.params.id, req.body);
        return res.json({ success: true, question });
    } catch(e) {
        console.log(e);
        return res.json({ success: false, message: INTERNAL_ERROR_MSG });
    }
});

router.delete('/quizzes/:id/questions/:qid', async (req, res) => {
    try {
        const question = await quizController.removeQuestion(req.params.id, req.params.qid);
        return res.json({ success: true, question });
    } catch(e) {
        console.log(e);
        return res.json({ success: false, message: INTERNAL_ERROR_MSG });
    }
});

router.put('/quizzes/:id/questions/:qid', async (req, res) => {
    try {
        if(!isObjectNullOrEmpty(req.body) && !isStringNullOrEmpty(req.body.verbose))
            await quizController.updateQuestionVerbose(req.params.id, req.params.qid, req.body.verbose);
        if(!isObjectNullOrEmpty(req.body) && !isArrayNullOrEmpty(req.body.options))
            await quizController.updateQuestionOptions(req.params.id, req.params.qid, req.body.options);
        return res.json({ success: true, question: await quizController.getQuestion(req.params.id, req.params.qid) });
    } catch(e) {
        console.log(e);
        return res.json({ success: false, message: INTERNAL_ERROR_MSG });
    }
});

router.get('/quizzes/:id/questions/:qid', async (req, res) => {
    try {
        return res.json({ success: true, question: await quizController.getQuestion(req.params.id, req.params.qid) });
    } catch(e) {
        console.log(e);
        return res.json({ success: false, message: INTERNAL_ERROR_MSG });
    }
});

// router.delete('/quizzes/:id/questions/:qid', async (req, res) => {
//     try {
//         const question = await quizController.removeQuestion(req.params.id, req.params.qid);
//         return res.json({ success: true, question });
//     } catch(e) {
//         console.log(e);
//         return res.json({ success: false, message: INTERNAL_ERROR_MSG });
//     }
// });

module.exports = { router };