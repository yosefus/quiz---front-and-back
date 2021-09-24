const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async function connect() {
  try {
    await mongoose.connect(
      process.env.CONNECTIONSTRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      (err) => {
        if (err) throw err;
      }
    );
    //  sucesess
    console.log('we are on the air babyyyyy');
  } catch (error) {
    console.error('not connected', error.message);
  }
};
