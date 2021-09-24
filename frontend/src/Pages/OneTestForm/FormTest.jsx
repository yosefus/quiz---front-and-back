import React from 'react';
import styles from './style.module.css';

function FormTest({ fn, currTest, publish }) {
  console.log(publish);
  return (
    <div className={`${styles.formTestBox}  `}>
      <form onSubmit={(event) => fn(event)} className={`${styles.formtest} ${styles.bigtest} ${'entryPages'} ${'boxBlur'} `}>
        <label htmlFor="title">
          כותרת
          <input id="title" placeholder="title" name="title" type="text" defaultValue={currTest ? currTest.quiz.title : ''} required />
        </label>
        <label htmlFor="description">
          תיאור
          <input id="description" placeholder="description" name="description" type="text" defaultValue={currTest ? currTest.quiz.description : ''} required />
        </label>
        <label htmlFor="deadline_date">
          תאריך אחרון להגשה
          <input id="deadline_date" name="deadline_date" type="Date" />
        </label>

        {/* {currTest && (
          <div className={styles.publish}>
            <input type="checkbox" name="publish" id="status" />
            <label htmlFor="status">לפרסם</label>
          </div>
        )} */}
        {!publish && <input className={styles.submit} type="submit" value={currTest ? 'עדכן' : 'שלח'} />}
      </form>
    </div>
  );
}

export default FormTest;
