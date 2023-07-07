import Transaction from '../transaction/Transaction';
import InfoBoard from './InfoBoard';
import classes from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <>
      <InfoBoard />
      <div className={classes.main}>
        <Transaction main={true} />
      </div>
    </>
  );
};

export default Dashboard;
