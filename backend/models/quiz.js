const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quizSchema = new Schema({
  title: { type: String, trim: true, lowercase: true, required: true },
  description: { type: String, trim: true, lowercase: true, required: true },
  creator_id: { type: String, trim: true, required: true },
  create_date: { type: Date, required: true },
  deadline_date: { type: Date },
  quiz_type: { type: String, enum: ['quiz', 'poll'], default: 'quiz' },
  status: { type: String, enum: ['new', 'draft', 'published'], default: 'draft' },
  active: { type: Boolean, default: true },
  shared: { type: Boolean, required: true, default: false },
  link: { type: String, trim: true, required: true, default: 'a' },
  link_entries: { type: Number, default: 0 },
});

const QuizModel = model('quiz', quizSchema);

module.exports = QuizModel; //export
