import { useEffect, useState } from 'react';
import styles from './style.module.css';
import genericConect from '../../function';
import TableRow from './TableRow';
import { useHistory } from 'react-router-dom';

function CreatedTests() {
  const [myQuizs, setMyQuizs] = useState(),
    history = useHistory(),
    [error, setError] = useState(); //TODO

  // load all of the tests from the DB
  async function getMyQuizs() {
    try {
      const TempQuizs = await genericConect('get', `/quiz?creatorFilter=true`);
      setMyQuizs(TempQuizs.data);
    } catch (error) {
      // const err = `${erorr.response.date.error}`; //TODO
      // console.log(err);
      setError(error);
    }
  }

  // delete one test from the DB
  async function delOneTest(id) {
    await genericConect('put', `/quiz?delete=true&id=${id}`);
    getMyQuizs();
  }

  useEffect(() => {
    getMyQuizs();
  }, []);

  return (
    <div className={`${styles.wrapper}`}>
      {myQuizs ? (
        <table className={`${'entryPages'}`} dir="rtl">
          <thead>
            <tr>
              <th>כותרת</th>
              <th>תיאור</th>
              <th>תאריך יצירה</th>
              <th>dead line</th>
              <th>סטטוס</th>
              <th>קישור</th>
            </tr>
          </thead>
          <tbody>
            {myQuizs.map((item) => (
              <TableRow key={item._id} item={item} fnDel={delOneTest} />
            ))}
          </tbody>
        </table>
      ) : (
        'loading'
      )}
      <div onClick={() => history.push('/test-form/new')} className={`${styles.createNew} ${'boxBlur'} ${'entryPages'}`}>
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
}

export default CreatedTests;
