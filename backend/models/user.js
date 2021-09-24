const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, trim: true, lowercase: true, required: true },
  last_name: { type: String, trim: true, lowercase: true, required: true },
  mail: { type: String, trim: true, lowercase: true, required: true, unique: true },
  password: { type: String, trim: true, required: true, select: false },
  create_date: { type: Date, required: true },
  active: { type: Boolean, required: true },
  token: { type: String, select: false },
});

const UserModel = model('user', userSchema);

module.exports = UserModel; //export
