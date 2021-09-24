import styles from './style.module.css';
import { useState } from 'react';

function FormQuestion({ fn, item, index, currTest }) {
  const [question, setQuestion] = useState(item);
  const [answerList, setanswerList] = useState(item.answers);

  // handle input change question
  const handleInputChangeQuestion = (e) => {
    const { name, value } = e.target;
    const list = question;
    list[name] = value;
    setQuestion({ ...list });
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerList];
    list[index][name] = value;
    setanswerList(list);
  };

  // handle input change
  const handleCheckboxChange = (e, index) => {
    console.log('o');
    const { name, checked } = e.target;
    const list = [...answerList];
    list[index][name] = checked;
    setanswerList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...answerList];
    list.splice(index, 1);
    setanswerList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setanswerList([...answerList, { description: '', correct: false }]);
  };

  return (
    <>
      <form onSubmit={(event) => fn(event, item._id, question, answerList)} className={`${styles.formquestion} ${'entryPages'} ${'boxBlur'}`}>
        <h3 dir="rtl"> שאלה מספר {index + 1}</h3>
        <label htmlFor="title">
          כותרת
          <input required onChange={(e) => handleInputChangeQuestion(e)} id="title" name="title" type="text" defaultValue={item.title} />
        </label>
        <label htmlFor="description">
          תיאור
          <input required onChange={(e) => handleInputChangeQuestion(e)} id="description" name="description" type="text" defaultValue={item.description} />
        </label>
        <label htmlFor="score">
          ציון
          <input onChange={(e) => handleInputChangeQuestion(e)} id="score" name="score" type="number" defaultValue={item.score} />
        </label>
        {answerList
          ? answerList.map((x, i) => {
              return (
                <div key={76 + i}>
                  <p>תשובות</p>
                  <div className={styles.answersbtn}>
                    {answerList.length !== 1 && (
                      <button onClick={() => handleRemoveClick(i)}>
                        <i className="fas fa-minus"></i>
                      </button>
                    )}
                    <input type="text" className={styles.answer} name="description" required placeholder={`answer ${i + 1}`} value={x.description} onChange={(e) => handleInputChange(e, i)} />
                    {answerList.length - 1 === i && (
                      <button onClick={handleAddClick}>
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                  </div>
                  <div className={styles.correct}>
                    <p>תשובה נכונה</p>
                    <input type="checkbox" name="correct" checked={x.correct} onChange={(e) => handleCheckboxChange(e, i)} />
                  </div>
                </div>
              );
            })
          : 'loading'}
        <div className={styles.flex}>{currTest && <>{currTest.quiz.status !== 'published' && <input className={styles.submit} type="submit" value={item._id ? 'עדכן' : 'צור'} />}</>}</div>
      </form>
    </>
  );
}

export default FormQuestion;
