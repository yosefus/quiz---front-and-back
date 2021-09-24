import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useHistory, useParams } from 'react-router-dom';
import genericConect from '../../function';
import FormTest from './FormTest';
import FormQuestion from './FormQuestion';
import TestersAdd from './TestersAdd';
import PopUpMsg from '../../components/PopUpMsg';

function OneTestForm() {
  const param = useParams(),
    [currTest, setCurrTest] = useState(),
    [questionsState, setquestionsState] = useState(),
    [Publish, setPublish] = useState(),
    [score, setScore] = useState(0),
    history = useHistory(),
    [error, setEror] = useState(); //TODO

  useEffect(() => {
    getCurrTest();
  }, []);

  useEffect(() => {
    if (questionsState) getScore();
  }, [questionsState]);

  // get the current test once the page refresh
  async function getCurrTest() {
    if (param.testId !== 'new') {
      const resQuiz = await genericConect('get', `/quiz?creatorFilter=true&id=${param.testId}`);
      setCurrTest(resQuiz.data);

      !Publish ? setquestionsState([...resQuiz.data.questions, { title: '', description: '', quiz_id: resQuiz.data.quiz._id, score: 0, answers: [{ description: '', correct: false }] }]) : setquestionsState([...resQuiz.data.questions]);
      resQuiz.data.quiz.status === 'published' ? setPublish(true) : setPublish(false);
    }
  }

  function getScore() {
    setScore(questionsState.reduce((acc, item) => (acc += item.score), 0));
  }

  // submit the test
  async function editQuiz(event) {
    event.preventDefault();
    const values = Object.values(event.target).reduce(
      (acc, input) =>
        !input.name
          ? acc
          : !input.value.length
          ? acc
          : {
              ...acc,
              [input.name]: input.type === 'checkbox' ? input.checked : input.value,
            },
      {}
    );

    if (param.testId === 'new') {
      //new test
      const resultNew = await genericConect('post', `/quiz`, values);
      history.push(`/test-form/${resultNew.data._id}`);
    } else {
      // update test
      const resultUpdate = await genericConect('put', `/quiz?id=${param.testId}`, values);
      getCurrTest();
    }
  }

  // publish the test
  async function publishTest() {
    if (questionsState.length > 1) {
      if (score < 100) {
        alert('u need at list 100 score to publish');
      } else {
        await genericConect('put', `/quiz?id=${param.testId}`, { status: 'published' });
        getCurrTest();
      }
    } else {
      setEror(' מצטערים - אינך יכול לפרסם מבחן ללא שאלות');
    }
  }

  // submit the question - new and update
  async function addQuestion(event, id, question, answerList) {
    event.preventDefault();
    question.answers = answerList;
    question.quiz_id = currTest.quiz._id;

    if (!id) {
      // new question
      await genericConect('post', `/question`, question);
      event.target.reset();
      getCurrTest();
    } else {
      // update question
      await genericConect('put', `/question`, { id: id, newData: question });
      event.target.reset();
      getCurrTest();
    }
  }

  return (
    <div className={`${styles.wrapperflex} `}>
      <FormTest fn={editQuiz} publish={Publish} currTest={currTest} />

      {currTest && (
        <>
          <div className={styles.full}>
            <div dir="rtl" className={styles.flex}>
              {questionsState && questionsState.map((item, index) => <FormQuestion currTest={currTest} fn={addQuestion} key={index} item={item} index={index} />)}
            </div>
          </div>
          {Publish && <TestersAdd quiz_id={param.testId} />}
        </>
      )}

      {!Publish && score ? (
        <button onClick={publishTest} className={`${styles.publishBox} ${'boxBlur'} ${'entryPages'}`}>
          פרסם
        </button>
      ) : (
        ''
      )}

      {!Publish && score ? (
        <button className={`${styles.scoreBox} ${'boxBlur'} ${'entryPages'}`}>
          score: <br />
          {score}
        </button>
      ) : (
        ''
      )}
      <PopUpMsg msg={'creatTestMsg'} />
    </div>
  );
}

export default OneTestForm;
