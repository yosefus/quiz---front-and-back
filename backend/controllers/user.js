const UserModel = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('../jwt');

// sign up a new user
async function createUser(body) {
  try {
    const pass = body.password; // to change after figure up the sign up thing

    if (!Object.keys(body)[0]) throw 'you didnt put anything';
    if (await UserModel.findOne({ mail: body.mail })) throw 'the mail already sign up to our site';
    if (!body.mail || !body.first_name || !body.last_name || !body.password) throw 'something missing';

    body.password = bcryptjs.hashSync(body.password, 8);
    body.active = true;
    body.create_date = new Date();

    const newUser = await UserModel.create(body); // to change after figure up the sign up thing
    return await loginUser(body.mail, pass); // to change after figure up the sign up thing
  } catch (error) {
    throw error;
  }
}
exports.createUser = createUser;

// update user by token varify
async function updateByToken(token, newData) {
  try {
    if (!token) throw 'token is missing';
    if (!newData) throw 'new data is missing';

    const found = await jwt.verifyToken(token);

    // const { first_name, last_name, active } = newData; //TODO
    // const res = await UserModel.findByIdAndUpdate(found._id, newData, { new: true });

    const _newData = {};
    _newData.first_name = newData.first_name;
    _newData.last_name = newData.last_name;
    _newData.active = newData.active;
    const res = await UserModel.findByIdAndUpdate(found._id, _newData, { new: true });

    return res;
  } catch (error) {
    throw error;
  }
}
exports.updateByToken = updateByToken;

// update user by token varify
async function getUserByToken(token) {
  if (!token) throw 'token is missing';
  return await jwt.verifyToken(token);
}
exports.getUserByToken = getUserByToken;

// login by mail and password
async function loginUser(_mail, _password) {
  console.log(_mail, _password);
  if (!_mail || !_password) throw 'id or password is missing ';
  const foundUser = await UserModel.findOne({ mail: _mail }, '+password');
  if (foundUser) {
    foundUser.token = jwt.createToken(foundUser._id); //create token
    await UserModel.findByIdAndUpdate(foundUser._id, foundUser);
  } else throw 'wrong input - try again 1';
  if (!bcryptjs.compareSync(_password, foundUser.password)) {
    throw 'wrong input - try again 2';
  } else return await UserModel.findOne({ mail: _mail }, '+token');
}
exports.loginUser = loginUser;

// =======================================================================================================
// read
async function read(filter) {
  const result = await UserModel.find(filter, function (err, results) {
    if (err) /* return false */ throw 'no one found';
    if (!results.length) /* return false */ throw 'no result found';
  });
  return result;
}
exports.read = read;

// read one
async function readOne(filter) {
  console.log('start finding one');
  const foundUser = await UserModel.findOne(filter);
  return foundUser;
}
exports.readOne = readOne;
