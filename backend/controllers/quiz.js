const QuizModel = require('../models/quiz');
const jwt = require('../jwt');
const QuestionController = require('../controllers/question');

// create new quiz
async function createQuiz(data, token) {
  if (!Object.keys(data)[0]) throw 'you didnt put anything';
  const checkedToken = await jwt.verifyToken(token);
  data.creator_id = checkedToken._id;
  data.create_date = new Date();

  console.log(data);
  const res = await QuizModel.create(data);
  return res;
}
exports.createQuiz = createQuiz;

// read
async function read(filter) {
  return await QuizModel.find(filter);
}
exports.read = read;

// read one
async function readOne(filter) {
  return (result = await QuizModel.findOne(filter));
}
exports.readOne = readOne;

// read by creator id = token
async function readByToken(token) {
  const foundUserByToken = await jwt.verifyToken(token);
  const result = await QuizModel.find({ creator_id: foundUserByToken._id, active: true });
  if (!result) throw 'you dont have any quizes';
  return result;
}
exports.readByToken = readByToken;

// update one by id + token
async function update(id, _newData, token, del) {
  try {
    let newData = _newData;

    const foundUserByToken = await jwt.verifyToken(token);
    const theQuiz = await readOne({ _id: id });

    if (theQuiz.creator_id != foundUserByToken._id) throw 'not auth';
    if (theQuiz.status == 'published' && !del) throw 'you cant change the quiz';

    if (newData.status == 'published') {
      const foundQuestions = await QuestionController.read({ quiz_id: id });
      console.log(foundQuestions);
      if (foundQuestions.length < 1) throw 'there no questions to publish'; //
    }

    if (del) newData = { active: false };

    const updateQuiz = await QuizModel.findByIdAndUpdate(id, newData, { new: true });
    return updateQuiz;
  } catch (error) {
    throw error;
  }
}
exports.update = update;
