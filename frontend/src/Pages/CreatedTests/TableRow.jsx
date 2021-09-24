import styles from './style.module.css';
import { Link } from 'react-router-dom';
const moment = require('moment');

function TableRow({ item, fnDel }) {
  return (
    <>
      {item ? (
        <tr key={item._id}>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{moment(item.create_date).format('L')}</td>
          <td>{item.deadline_date ? moment(item.deadline_date).format('L') : 'אין'}</td>
          <td>{item.status}</td>

          <td className={styles.links}>
            <span onClick={() => fnDel(item._id)} className={styles.trash}>
              <i className="far fa-trash-alt"> </i>
            </span>

            <Link to={`/test-form/${item._id}`}>{item.status === 'draft' ? <i className="far fa-edit"></i> : <i className="far fa-eye"></i>}</Link>
          </td>
        </tr>
      ) : (
        ''
      )}
    </>
  );
}

export default TableRow;
