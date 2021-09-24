import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './style.module.css';

function ScorePopup({ score }) {
  const history = useHistory();
  function backToTests() {
    history.push('/assigned-tests');
  }
  return (
    <div onClick={(e) => backToTests()} className={styles.popup}>
      <div className={`${styles.form} ${styles.popbox} ${'entryPages'}`}>
        <h2>
          your score is <span>{score}</span>
        </h2>
      </div>
    </div>
  );
}

export default ScorePopup;
