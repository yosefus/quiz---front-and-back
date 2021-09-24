const QuestionModel = require('../models/question');
const QuizDetailsModel = require('../models/quiz_details');
const QuizModel = require('../models/quiz');
const UserModel = require('../models/user');

const QuestionController = require('../controllers/question');
const QuizDetailsController = require('../controllers/quiz_details');
const QuizController = require('../controllers/quiz');
const UserController = require('../controllers/user');

const jwt = require('../jwt');

exports.updateQuiz = async function updateQuiz(_id_test, token, newDataTest) {
  try {
    const foundUser = await jwt.verifyToken(token);
    const theQuiz = await QuizController.readOne({ _id: _id_test });
    if (theQuiz.creator_id != foundUser._id) throw 'not your test body';
    const updateQuiz = await QuizController.update(_id_test, newDataTest);
    if (newDataQuestion) {
    }
    return;
  } catch (error) {
    error;
  }
};

// create one question
exports.createQuestion = async function createQuestion(question, token) {
  const foundUser = await jwt.verifyToken(token);
  const foundQuiz = await QuizController.readOne({ _id: question.quiz_id });

  if (!foundQuiz) throw 'not found a quiz with that id';
  if (foundUser.id != foundQuiz.creator_id) throw 'is not your quiz to change';

  return await QuestionController.createQuestion(question);
};

// createQuestion(ques, userToken);

exports.getOneTestToCreator = async function getOneTestToCreator(id, token) {
  const foundUser = await jwt.verifyToken(token);
  const theQuiz = await QuizController.readOne({ _id: id });

  if (theQuiz.creator_id != foundUser._id) throw 'not your test';

  const theQuestions = await QuestionController.read({ quiz_id: theQuiz._id });

  return { quiz: theQuiz, questions: theQuestions };
};

// to get all of my quizs
exports.getMyQuizs = async function getMyQuizs(token) {
  const foundUser = await jwt.verifyToken(token);

  let theQuizsDetailsOfTheUser = await QuizDetailsController.read({ user_mail: foundUser.mail, active: true });
  const ids = theQuizsDetailsOfTheUser.map((item) => item.quiz_id);

  if (!theQuizsDetailsOfTheUser.length) throw 'there no quizs to you';

  let result = await QuizController.read({ _id: { $in: ids } });

  theQuizsDetailsOfTheUser = theQuizsDetailsOfTheUser.sort((a, b) => (a.quiz_id > b.quiz_id && 1) || -1);
  result = result.sort((a, b) => (a._id > b._id && 1) || -1);

  console.log('1111');

  const re = theQuizsDetailsOfTheUser
    .map((item, index) => [item, result[index]])
    .sort((a, b) => (a[1].create_date > b[1].create_date && 1) || -1)
    .filter((item) => item[1].active && item[1].status == 'published');

  // console.log(re);
  return re;
};

// to get one of my quizs
async function getMyOneQuizs(token, _quizId) {
  console.log('!');
  const foundUser = await jwt.verifyToken(token);
  if (!foundUser) throw 'token error';

  const theQuiz = await QuizController.readOne({ _id: _quizId });
  if (!theQuiz) throw 'cant read the quiz error';

  const qoizDetails = await QuizDetailsController.readOne({ user_mail: foundUser.mail, quiz_id: _quizId });
  if (!qoizDetails) throw 'cant read the quiz details';

  const theQuestions = await QuestionController.read({ quiz_id: _quizId });
  if (!theQuestions.length) throw 'cant read the quiz questions';

  return { quiz: theQuiz, quiz_details: qoizDetails, questions: theQuestions };
}
exports.getMyOneQuizs = getMyOneQuizs;

// read open one
exports.readOpenOne = async function readOpenOne(filter, token) {
  const checkedToken = await jwt.verifyToken(token);
  const result = await QuizModel.findOne(filter);

  if (result.shared == true || result.quiz_type == 'pool') {
    const create = await QuizDetailsController.createQuizDetails({ user_id: checkedToken._id, quiz_id: result._id });

    return await getMyOneQuizs(token, result._id);
  }
};

// to add ppl to quizs details open one
exports.invitePpl = async function invitePpl(_mail, token, _quiz_id) {
  const checkedToken = await jwt.verifyToken(token);
  const resultQuiz = await QuizModel.findOne({ _id: _quiz_id });

  // if (resultQuiz.status != 'published') throw 'u cant invite ppl yet';
  if (resultQuiz.creator_id != checkedToken._id) throw 'is not your quiz to share';

  const res = await QuizDetailsController.createQuizDetails({ user_mail: _mail, quiz_id: _quiz_id });
  return res;
};

exports.readTesters = async function readTesters(_quizId, token) {
  const checkedToken = await jwt.verifyToken(token);
  const res = await QuizDetailsModel.find({ quiz_id: _quizId });
  const test = await QuizModel.findOne({ _id: _quizId });

  if (test.creator_id != checkedToken._id) throw 'is not your quiz';

  const theMailList = res.map((item) => [item.user_mail, item._id, item.active]);

  return theMailList;
};

// check the score
exports.submitTest = async function submitTest(id, newData, token) {
  console.log(id, newData, token);
  const updateQuizDetails = await QuizDetailsController.updateByToken(id, newData, token);
  const foundQuestions = await QuestionController.read({ quiz_id: updateQuizDetails.quiz_id });

  let result = 0;
  updateQuizDetails.answers.forEach((question) => {
    const foundOneOrginalQuestion = foundQuestions.find((item) => item._id == question.id_question);
    const pointsOfCurrect = foundOneOrginalQuestion.score / foundOneOrginalQuestion.answers.filter((item) => item.correct).length;
    question.id_answers.forEach((answer_id) => {
      if (foundOneOrginalQuestion.answers.find((answer) => answer._id == answer_id).correct) {
        result += pointsOfCurrect;
      } else {
        result -= pointsOfCurrect;
      }
    });
  });
  result = result.toFixed();

  await QuizDetailsController.update(id, { status: 'submitted', score: result }, token);
  return result;
};

// delete the quiz-details in the middle
async function deleteByIdAndToken(id, _active, token) {
  console.log('1');

  console.log(id, _active, token);

  const checkedToken = await jwt.verifyToken(token),
    theQuizDetails = await QuizDetailsModel.findOne({ _id: id }),
    theQuiz = await QuizController.readOne({ _id: theQuizDetails.quiz_id });

  console.log('2');
  const action = { active: _active };
  console.log(action);

  if (theQuiz.creator_id != checkedToken.id) throw 'is not your test to delete';
  if (!theQuiz) throw 'we didnt fount the quiz';
  if (!theQuizDetails) throw 'we didnt found your test details';
  console.log('11');
  if (theQuizDetails.status == 'submitted') throw 'you cant change the quiz after submited';
  console.log('22');

  console.log('3');
  const re = await QuizDetailsModel.findByIdAndUpdate(id, action, { new: true });
  console.log(re);
  return re;
}
exports.deleteByIdAndToken = deleteByIdAndToken;
