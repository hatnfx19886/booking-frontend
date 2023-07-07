import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './InfoBoard.module.css';

const InfoBoard = () => {
  return (
    <div className={classes.info}>
      <div className={classes.item}>
        <p>USERS</p>
        <h3>100</h3>
        <div className={classes.icon}>
          <FontAwesomeIcon icon='fa-regular fa-user' className={classes.user} />
        </div>
      </div>
      <div className={classes.item}>
        <p>ORDERS</p>
        <h3>100</h3>
        <div className={classes.icon}>
          <FontAwesomeIcon
            icon='fa-solid fa-cart-shopping'
            className={classes.order}
          />
        </div>
      </div>
      <div className={classes.item}>
        <p>EARNINGS</p>
        <h3>$ 100</h3>
        <div className={classes.icon}>
          <FontAwesomeIcon
            icon='fa-solid fa-dollar-sign'
            className={classes.earning}
          />
        </div>
      </div>
      <div className={classes.item}>
        <p>BALANCE</p>
        <h3>$ 100</h3>
        <div className={classes.icon}>
          <FontAwesomeIcon
            icon='fa-solid fa-coins'
            className={classes.balance}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoBoard;
