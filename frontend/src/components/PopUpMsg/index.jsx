import React, { useState } from 'react';
import styles from './style.module.css';

export default function PopUpMsg(props) {
  const [popUpOpen, setPopUpOpen] = useState(true);
  const msg = props.msg;

  const msgs = {
    creatTestMsg: (
      <>
        <h2>הוראות</h2>
        <dl>
          <li> לאחר יצירת כותרת ותיאור יש ללחוץ על שלח ולרענן את הדף</li>
          <li> לאחר יצירת השאלה לחץ\י על צור ושאלה חדשה וריקה תופיע</li>
          <li> מצד שמאל למטה יופיע את סיכום הסך הכולל של הניקוד המשוכלל למבחן זה וכפתור פרסום המבחן</li>
          <li> על מנת לפרסם את המבחן יש לבדוק שהציון הכולל של המבחן הוא 100 נקודות או יותר</li>
          <li> לאחר יצירת המבחן תוכל\י לשבץ לתוכו אנשים על ידי מייל או להסירם בחלונית חדשה שתפתח למטה</li>
          <li> לאחר הפרסום המבחן לא ניתן לעריכה, אנא בדוק\בדקי את המבחן היטב לפני הפרסום</li>
          <li> אנא תרחם\י על התלמידים האומללים ותעשה מבחן קל</li>
        </dl>
        <h3>בהצלחה לכולנו</h3>
      </>
    ),
    doingTestMsg: (
      <>
        <h2>הוראות</h2>
        <dl>
          <li>הגשת המבחן הינה סופית ואיננה ניתנת לשינוי</li>
          <li>לאחר הגשת המבחן תקבל את הציון מיד</li>
        </dl>
        <h3>בהצלחה לכולנו</h3>
      </>
    ),
  };
  return (
    <>
      {popUpOpen ? (
        <div className={`${styles.wrapper}  `} onClick={() => setPopUpOpen(false)}>
          <div className={`${styles.box} ${'boxBlur'} ${'entryPages'}`}>{msgs[msg]}</div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
