import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/authContext';
import classes from './Sidebar.module.css';

const Sidebar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <h4 className={classes.title}>Admin Page</h4>
        <p className='smaller'>MAIN</p>
        <div className={classes.item} onClick={() => navigate('/')}>
          <img src='./dashboard.png' alt='' height='16px' />
          <span>Dashboard</span>
        </div>
        <p className='smaller'>LIST</p>
        <div className={classes.item}>
          <FontAwesomeIcon icon='fa-regular fa-user' />
          <span>User</span>
        </div>
        <div className={classes.item} onClick={() => navigate('/hotels')}>
          <FontAwesomeIcon icon='fa-solid fa-shop' />
          <span>Hotels</span>
        </div>
        <div className={classes.item} onClick={() => navigate('/rooms')}>
          <FontAwesomeIcon icon='fa-solid fa-window-maximize' />
          <span>Rooms</span>
        </div>
        <div className={classes.item} onClick={() => navigate('/transactions')}>
          <FontAwesomeIcon icon='fa-solid fa-truck' />
          <span>Transactions</span>
        </div>
        <p className='smaller'>NEW</p>
        <div className={classes.item} onClick={() => navigate('/hotels/add')}>
          <FontAwesomeIcon icon='fa-solid fa-shop' />
          <span>New Hotel</span>
        </div>
        <div className={classes.item} onClick={() => navigate('/rooms/add')}>
          <FontAwesomeIcon icon='fa-solid fa-window-maximize' />
          <span>New Room</span>
        </div>
        <p className='smaller'>USER</p>
        <div
          className={classes.item}
          onClick={() => {
            navigate('/');
            auth.logout();
          }}
        >
          <FontAwesomeIcon icon='fa-solid fa-right-to-bracket' />
          <span>Logout</span>
        </div>
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default Sidebar;
