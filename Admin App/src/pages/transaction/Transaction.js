import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import useHttp from '../../hooks/useHttp';
import classes from './Transaction.module.css';

const Transaction = ({ main }) => {
  const [trans, setTrans] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: main ? '/' : '/transaction',
      headers: { 'Set-Cookie': document.cookie },
    };
    const applyData = (data) => {
      setTrans(data);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest, main]);
  return (
    <>
      <p className={classes.title}>
        {main ? 'Latest Transactions' : 'Transactions List'}
      </p>
      {isLoading && <Spinner variant='dark' />}
      {!isLoading && error && <h3>{error}</h3>}
      {!isLoading && !error && (
        <div className={classes.table}>
          <div className={classes.row + ' ' + classes.head}>
            <div md='auto'>
              <input type='checkbox' />
            </div>
            <p>ID</p>
            <p>User</p>
            <p>Hotel</p>
            <p>Room</p>
            <p>Date</p>
            <p>Price</p>
            <p>Payment Method</p>
            <p>Status</p>
          </div>
          {trans.map((x) => (
            <div key={x._id} className={classes.row}>
              <div md='auto'>
                <input type='checkbox' />
              </div>
              <p>{x._id}</p>
              <p>{x.user}</p>
              <p>{x.hotel.name}</p>
              <p>{x.room.map((x) => x.number).join(', ')}</p>
              <p>
                {new Date(x.dateStart).toLocaleDateString('vi-VN') +
                  ' - ' +
                  new Date(x.dateEnd).toLocaleDateString('vi-VN')}
              </p>
              <p>${x.price}</p>
              <p>{x.payment}</p>
              <p
                className={
                  x.status === 'Booked'
                    ? classes.booked
                    : x.status === 'Checkin'
                    ? classes.checkin
                    : classes.checkout
                }
              >
                {x.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Transaction;
