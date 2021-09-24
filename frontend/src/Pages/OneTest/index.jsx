import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import genericConect from '../../function';
import ScorePopup from './ScorePopup';
import PopUpMsg from '../../components/PopUpMsg';
const moment = require('moment');

function OneTest() {
  const param = useParams(),
    [currTest, setCurrTest] = useState(),
    [result, setResult] = useState();

  const answerState = useState([]),
    [answerList, setAnswerList] = answerState;

  // get the current test by param
  async function getCurrentTest() {
    try {
      const resQuiz = await genericConect('get', `/quizdetails?myQuizs=true&QuizId=${param.testId}`);
      // if (!resQuiz) throw 'cant read the questions';
      console.log(resQuiz.data);
      setCurrTest(resQuiz.data);
    } catch (error) {
      alert(error.message);
    }
  }

  // submit
  async function sendTest(event) {
    event.preventDefault();
    const QuizToSend = { answers: answerList };
    console.log(QuizToSend);
    const sended = await genericConect('put', `/submit/${currTest.quiz_details._id}`, QuizToSend);
    setResult(sended.data);
  }

  // save the test answers in evry change
  async function onChangeInput(event, question, answer) {
    const tempList = answerList;
    const foundQuesInList = tempList.find(({ id_question }) => question._id === id_question);
    if (foundQuesInList) {
      const foundIndexAnswerInList = foundQuesInList.id_answers.findIndex((answer_find) => answer_find === answer._id);
      if (foundIndexAnswerInList > -1) {
        foundQuesInList.id_answers.splice(foundIndexAnswerInList, 1);
      } else {
        foundQuesInList.id_answers.push(answer._id);
      }
      setAnswerList([...tempList]);
    } else {
      const newAnswer = [...answerList, { id_question: question._id, id_answers: [answer._id] }];
      setAnswerList(newAnswer);
    }
  }

  useEffect(() => {
    getCurrentTest();
  }, []);

  return (
    <div className={styles.all}>
      {currTest ? (
        <>
          <div dir="rtl" className={styles.wrapper}>
            <div className={` ${styles.header} ${'entryPages'}`}>
              <h2>
                <span>{currTest.quiz.title}</span>
              </h2>
              <p>
                תיאור: <span>{currTest.quiz.description}</span>
              </p>
              <p>
                תאריך יצירה: <span>{moment(currTest.quiz.create_date).format('L')}</span>
              </p>
            </div>
          </div>
          <div className={styles.wrapper}>
            <form className={`${styles.form} ${'entryPages'}`} onSubmit={(e) => sendTest(e)}>
              {currTest.questions.map((question, index) => {
                return (
                  <div key={`${question.title}+${index}`}>
                    <h2>שאלה מספר {index + 1}</h2>
                    <p>{question.title}</p>
                    <p>{question.description}</p>
                    {question.answers.map((answer, index) => {
                      return (
                        <label key={`${answer.title}+${index}`}>
                          <p>
                            <span> {index + 1} </span> {answer.description}
                          </p>
                          <input onChange={(e) => onChangeInput(e, question, answer)} type="checkbox" name="correct" />
                        </label>
                      );
                    })}
                  </div>
                );
              })}
              <div className={styles.submit}>
                <input type="submit" value="שלח" />
              </div>
            </form>
          </div>
        </>
      ) : (
        'loading'
      )}
      {result ? <ScorePopup score={result} /> : ''}
      <PopUpMsg msg={'doingTestMsg'} />
    </div>
  );
}

export default OneTest;
