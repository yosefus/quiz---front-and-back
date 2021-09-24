const QuizDetailsModel = require('../models/quiz_details');
const jwt = require('../jwt');

// create new user
async function createQuizDetails(body) {
  if (!Object.keys(body)[0]) throw 'you didnt put anything';
  body.uniqueUserTest = body.user_mail + body.quiz_id;
  body.create_date = new Date();
  const newD = await QuizDetailsModel.create(body);
  if (!newD) throw 'something wrong';
  return newD;
}
exports.createQuizDetails = createQuizDetails;

// read
async function read(filter) {
  return await QuizDetailsModel.find(filter);
}
exports.read = read;

// read
async function readByToken(token) {
  try {
    const checkedToken = await jwt.verifyToken(token);
    const myQuizs = await QuizDetailsModel.find({ user_id: checkedToken._id });
    if (!myQuizs.leangth) {
      throw 'you dont have any quizs yet';
    }
    return myQuizs;
  } catch (error) {
    throw error;
  }
}
exports.readByToken = readByToken;

// read
async function read(filter) {
  return await QuizDetailsModel.find(filter);
}
exports.read = read;

// read one
async function readOne(filter) {
  return await QuizDetailsModel.findOne(filter);
}
exports.readOne = readOne;

// update one
async function update(id, newData) {
  return await QuizDetailsModel.findByIdAndUpdate(id, newData, { new: true });
}
exports.update = update;

// save the quiz in the middle
async function updateByToken(id, newData, token) {
  console.log(id, newData, token);
  const checkedToken = await jwt.verifyToken(token);
  const theQuiz = await QuizDetailsModel.findOne({ _id: id });

  if (!theQuiz) throw 'we didnt found your test';
  if (checkedToken.mail != theQuiz.user_mail) throw 'is not your quiz';
  if (theQuiz.status == 'submitted') throw 'you cant change the quiz after submited';
  if (newData.score) throw 'u cant change the score';

  return await QuizDetailsModel.findByIdAndUpdate(id, newData, { new: true });
}
exports.updateByToken = updateByToken;
