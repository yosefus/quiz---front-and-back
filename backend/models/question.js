const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const questionSchema = new Schema({
  title: { type: String, trim: true, lowercase: true, required: true },
  description: { type: String, trim: true, required: true },
  question_type: { type: String, enum: ['radio', 'checkbox'], default: 'radio' },
  quiz_id: { type: String, required: true },
  required: { type: Boolean, default: true },
  score: { type: Number },
  answers: [
    {
      description: { type: String, trim: true, required: true },
      correct: { type: Boolean, required: true },
    },
  ],
});

const QuestionModel = model('question', questionSchema);
module.exports = QuestionModel; //export
