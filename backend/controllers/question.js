const QuestionModel = require('../models/question');
// const mongoose = require('mongoose');

// create new question
async function createQuestion(body) {
  if (!Object.keys(body)[0]) throw 'you didnt put anything';

  return await QuestionModel.create(body);
}
exports.createQuestion = createQuestion;

// read
async function read(filter) {
  return await QuestionModel.find(filter);
}
exports.read = read;

// read one
async function readOne(filter) {
  return await QuestionModel.findOne(filter);
}
exports.readOne = readOne;

// update one
async function update(_id, newData) {
  return await QuestionModel.findByIdAndUpdate(_id, newData, { new: true });
}
exports.update = update;
