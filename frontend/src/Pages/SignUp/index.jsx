import React from 'react';
import Login from '../../components/Login';
import styles from './style.module.css';

function SignUp() {
  return (
    <div className={styles.wrapper}>
      <Login />
      Sign Up
    </div>
  );
}

export default SignUp;
