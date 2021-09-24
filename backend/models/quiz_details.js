const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quizDetailsSchema = new Schema({
  user_mail: { type: String, trim: true, required: true }, // index does what?
  quiz_id: { type: String, trim: true, required: true }, // index does what?
  uniqueUserTest: { type: String, unique: true },
  score: { type: Number },
  status: { type: String, enum: ['before', 'progress', 'submitted'], default: 'before' },
  create_date: { type: Date, required: true },
  start_date: { type: Date },
  submit_date: { type: Date },
  active: { type: Boolean, default: true },
  answers: [
    {
      id_question: { type: String },
      id_answers: [{ type: String }],
    },
  ],
});

const QuizDetailsModel = model('quizDetails', quizDetailsSchema);

module.exports = QuizDetailsModel; //export
