const jwt = require('jsonwebtoken');
const UserController = require('./controllers/user');
const secret = process.env.SECRET;

exports.createToken = (id) => {
  const token = jwt.sign({ id }, secret, { expiresIn: '10d' });
  return token;
};

exports.verifyToken = async (token) => {
  if (!token) throw 'we didnt know who you are';
  const tokenData = jwt.verify(token, secret) || {}; //TODO return eror in invalid token but not my eror
  if (!tokenData || Date.now() > tokenData.exp * 1000) throw { error: 'token unouthorized' };
  const user = await UserController.readOne({ _id: tokenData.id });
  if (!user) throw 'not exicte';
  return user;
};
