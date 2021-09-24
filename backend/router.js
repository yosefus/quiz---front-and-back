const UserController = require('./controllers/user');
const QuizController = require('./controllers/quiz');
const QuestionController = require('./controllers/question');
const QuizDetailsController = require('./controllers/quiz_details');
const GlobalController = require('./controllers/global');

const jwt = require('./jwt');

module.exports = function Router(app) {
  // =====================================================================================================
  app.get('/name', async function (req, res) {
    res.send(`name: ${process.env.NAME_1}`);
  });

  // ============================================================================

  // add a new user - sign up
  app.post('/signup', async function (req, res) {
    try {
      const newUser = await UserController.createUser(req.body);
      res.send(newUser);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // login to the user acount
  app.post('/login', async function (req, res) {
    try {
      console.log(req.body);
      const resUser = await UserController.loginUser(req.body.mail, req.body.password);
      res.send(resUser);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // login to the user acount
  app.post('/user', async function (req, res) {
    try {
      console.log('1');
      const token = req.headers.authorization;
      const resUser = await UserController.getUserByToken(token);
      console.log(token, resUser);
      res.send(resUser);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // update user by token
  app.put('/user', async function (req, res) {
    try {
      const token = req.headers.authorization;
      const resUser = await UserController.updateByToken(token, req.body);
      console.log(resUser);
      res.send(resUser);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  //   get users????????????????????????????????????????????????????????????????
  app.get('/user', async function (req, res) {
    let resUser; // TODO add filters
    console.log(req.query.id);
    try {
      if (req.query.id) {
        resUser = await UserController.readOne({ _id: req.query.id });
      } else {
        resUser = await UserController.read();
      }
      console.log(resUser);
      res.send(resUser);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // =====================================================================================================

  // add a new quiz with token
  app.post('/quiz', async function (req, res) {
    try {
      const token = req.headers.authorization;
      const newQuiz = await QuizController.createQuiz(req.body, token);
      console.log(newQuiz);
      res.send(newQuiz);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // update quiz by id + token
  app.put('/quiz', async function (req, res) {
    try {
      const token = req.headers.authorization;
      const resUpdatedQuiz = await QuizController.update(req.query.id, req.body, token, req.query.delete);
      res.send(resUpdatedQuiz);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  //   get Quizs
  app.get('/quiz', async function (req, res) {
    try {
      let resQuizs;
      const token = req.headers.authorization;
      console.log(req.query, token);

      if (req.query.id && !req.query.creatorFilter) {
        // get into an open test
        resQuizs = await GlobalController.readOpenOne({ _id: req.query.id }, token);
      } else if (req.query.creatorFilter && !req.query.id) {
        // send creatorFilter = true get the all quizs that he's create
        resQuizs = await QuizController.readByToken(token);
      } else if (req.query.creatorFilter && req.query.id) {
        // send creatorFilter = true and the id of the test to get the quiz and the questions
        resQuizs = await GlobalController.getOneTestToCreator(req.query.id, token);
      } else {
        resQuizs = await QuizController.read();
      }

      console.log(resQuizs);
      res.send(resQuizs);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // =====================================================================================================

  // add a new question
  app.post('/question', async function (req, res) {
    try {
      const token = req.headers.authorization;
      const newQuestion = await GlobalController.createQuestion(req.body, token);
      console.log(newQuestion);
      res.send(newQuestion);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  //   get Question
  app.get('/question', async function (req, res) {
    let resQuestion; // TODO add filters

    try {
      if (req.query.id) {
        resQuestion = await QuestionController.readOne({ _id: req.query.id });
      } else {
        resQuestion = await QuestionController.read();
      }
      console.log(resQuestion);
      res.send(resQuestion);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // update question by id
  app.put('/question', async function (req, res) {
    try {
      console.log(req.body);
      const resQuestion = await QuestionController.update(req.body.id, req.body.newData);
      res.send(resQuestion);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // ===============================================================================================

  // add a new quiz_details
  app.post('/quizdetails', async function (req, res) {
    try {
      console.log(req.body); //DELETE
      const token = req.headers.authorization;
      const newQuizDetails = await GlobalController.invitePpl(req.body.mail, token, req.body.quiz_id);
      console.log(newQuizDetails); //DELETE
      res.send(newQuizDetails);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  //   get QuizDetails
  app.get('/quizdetails', async function (req, res) {
    const token = req.headers.authorization;
    let resQuizDetails; // TODO add filters

    try {
      if (req.query.myQuizs && req.query.QuizId) {
        // to get my one quiz onclick
        resQuizDetails = await GlobalController.getMyOneQuizs(token, req.query.QuizId);
      } else if (req.query.id) {
        // maybe we need to delete that
        resQuizDetails = await QuizDetailsController.readOne({ _id: req.query.id });
      } else if (req.query.myQuizs) {
        //get all of the quizs
        resQuizDetails = await GlobalController.getMyQuizs(token);
      } else if (req.query.creatorFilter) {
        //get all the testers for the quiz-creator
        resQuizDetails = await GlobalController.readTesters(req.query.quizId, token);
      } else {
        resQuizDetails = await QuizDetailsController.read();
      }

      // console.log(resQuizDetails);
      res.send(resQuizDetails);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // update QuizDetails by id
  app.put('/quizdetails/:id', async function (req, res) {
    try {
      const token = req.headers.authorization;
      const resQuizDetails = await QuizDetailsController.updateByToken(req.params.id, req.body, token);
      res.send(resQuizDetails);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // delete QuizDetails by id
  app.put('/deleteQuizDetails/:id', async function (req, res) {
    try {
      console.log('starting');
      const token = req.headers.authorization;
      const resQuizDetails = await GlobalController.deleteByIdAndToken(req.params.id, req.body.active, token);
      res.send(resQuizDetails);
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });

  // send a tset for score
  app.put('/submit/:id', async function (req, res) {
    try {
      const resQuizDetails = await GlobalController.submitTest(req.params.id, req.body, req.headers.authorization);
      res.send(resQuizDetails.toString());
    } catch (error) {
      res.status(400).send({ error: error.message || error });
    }
  });
};
