import { useEffect, useState } from 'react';
import styles from './style.module.css';
import genericConect from '../../function';

function TestersAdd({ quiz_id }) {
  const [testers, setTesters] = useState([]);

  useEffect(() => {
    getTesters();
  }, []);

  // add new testers
  async function addTesters(event) {
    try {
      event.preventDefault();
      await genericConect('post', `/quizdetails`, { mail: event.target.mail.value, quiz_id: quiz_id });
      getTesters();
      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  // get the testers for this test
  async function getTesters() {
    const restesters = await genericConect('get', `/quizdetails?creatorFilter=true&quizId=${quiz_id}`);
    console.log(restesters.data);
    setTesters(restesters.data);
  }

  // delete and re-add testers
  async function deleteReAddTester(Detsilsid, _active) {
    try {
      const result = await genericConect('put', `/deleteQuizDetails/${Detsilsid}`, { active: _active });
      getTesters();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={styles.flexEnd}>
      <div className={`${styles.addtesterbox} ${'boxBlur'} ${'entryPages'}`}>
        <h2>הוספת נבחנים</h2>
        <form onSubmit={(event) => addTesters(event)}>
          <input type="email" name="mail" placeholder="דואר אלקטרוני" required />
          <input className={styles.submit} type="submit" value="הוסף" />
        </form>
        <div className={styles.testersList}>
          {testers
            ? testers.map((item) =>
                item[2] ? (
                  <h5 onClick={() => deleteReAddTester(item[1], false)} key={`${item[0]}`}>
                    {item[0]} <i className="fas fa-trash-alt"></i>
                  </h5>
                ) : (
                  <p key={`${item[0]}`} onClick={() => deleteReAddTester(item[1], true)}>
                    {item[0]}
                  </p>
                )
              )
            : ' '}
        </div>
      </div>
    </div>
  );
}

export default TestersAdd;
