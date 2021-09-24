import styles from './style.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

function LittleAssignTest({ item, details }) {
  return (
    <div className={`${styles.little} ${'entryPages'}`}>
      <h2>
        שם: <span>{item.title}</span>
      </h2>
      <div className={styles.rightText}>
        <p>
          סטטוס: <span>{details.status === 'before' ? 'חדש' : details.status === 'progress' ? 'הותחל' : 'הוגש'}</span>
        </p>

        {details.score ? (
          <p>
            ציון: <span>{details.score}</span>
          </p>
        ) : (
          ''
        )}
        <p>
          תאריך הוספה: <span>{moment(details.create_date).format('L')}</span>
        </p>
      </div>{' '}
      {/* asxxb@gmail.com */}
      {!details.score && (
        <Link to={`/test/${item._id}`}>
          <div className={styles.enter}>
            <i className="fas fa-pen-alt"></i>
          </div>
        </Link>
      )}
    </div>
  );
}

export default LittleAssignTest;
