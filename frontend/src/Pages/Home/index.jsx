import styles from './style.module.css';

function Home() {
  return (
    <div className={`${styles.homeBackground} `}>
      <div className={`${'entryPages'} ${styles.homeHead}`}>
        <h1>
          Welcome To <br /> My Quizs
        </h1>
        <p>The most sophisticated system in the world for creating tests</p>
      </div>
    </div>
  );
}

export default Home;
