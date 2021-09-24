import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import genericConect from '../../function';
import LittleAssignTest from './LittleAssignTest';

function AssignedTests() {
  const [MyTests, setMyTests] = useState();

  async function getAssignTests() {
    const res = await genericConect('get', `/quizdetails?myQuizs=true`);
    setMyTests(res.data);
  }

  useEffect(() => {
    getAssignTests();
  }, []);

  return <div className={`${styles.wrapper} `}>{MyTests ? MyTests.map((item) => <LittleAssignTest key={item[0]._id} item={item[1]} details={item[0]} />) : 'loading'}</div>;
}

export default AssignedTests;
