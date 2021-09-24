import { useState, createContext, useEffect } from 'react';
import styles from './style.module.css';
import genericConect from '../../function';

export const UserContext = createContext();

export default function Login({ children }) {
  const loginState = useState('guest'),
    [user, setUser] = loginState,
    [Error, setError] = useState(''),
    [logSign, setLogSign] = useState('signup');

  async function getUserByToken() {
    const TempUser = await genericConect('post', `/user`);
    setUser(TempUser.data);
  }

  useEffect(() => {
    if (localStorage.token) {
      getUserByToken();
    }
  }, []);

  async function loginFn(event) {
    event.preventDefault();
    const values = Object.values(event.target).reduce(
      (acc, input) =>
        !input.name
          ? acc
          : {
              ...acc,
              [input.name]: input.type === 'checkbox' ? input.checked : input.value,
            },
      {}
    );
    try {
      const loginUser = await genericConect('post', `/${logSign}`, values);

      values.stayConected ? (localStorage.token = loginUser.data.token) : (sessionStorage.token = loginUser.data.token);

      setUser(loginUser.data);
    } catch (error) {
      setError('pleace change password or mail ');
    }
  }

  return (
    <UserContext.Provider value={loginState}>
      {user !== 'guest' ? (
        children
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.hideMe}>
            <div className={styles.typing}>Welcome Guest . . .</div>
          </div>

          <div className={styles.loginbox}>
            <div className={styles.loginform}>
              {logSign === 'signup' ? (
                <form onSubmit={(e) => loginFn(e)}>
                  <h2>הרשמה</h2>
                  <p>מערכת מבחנים מתקדמת</p>
                  <input type="text" name="first_name" placeholder="שם פרטי" />
                  <input type="text" name="last_name" placeholder="שם משפחה" />
                  <input type="email" name="mail" placeholder="דואר אלקטרוני" />
                  <input type="password" name="password" placeholder="סיסמא" />
                  <input className={styles.submit} type="submit" value={'שלח' || ''} />
                </form>
              ) : (
                <form onSubmit={(e) => loginFn(e)}>
                  <h2>התחברות</h2>

                  <input type="email" name="mail" placeholder="דואר אלקטרוני" />
                  <input type="password" name="password" placeholder="סיסמא" />
                  <div className={styles.stay}>
                    <input type="checkbox" name="stayConected" id="StayId" />
                    <label htmlFor="StayId">השאר מחובר</label>
                  </div>

                  <input className={styles.submit} type="submit" value={'שלח' || ''} />
                </form>
              )}
              <button className={styles.btnchange} onClick={() => setLogSign(logSign === 'signup' ? 'login' : 'signup')}>
                {logSign === 'signup' ? 'כבר נרשמתי' : 'להרשמה'}
              </button>
            </div>
            <div className={styles.erornote}>{Error.message}</div>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
}
