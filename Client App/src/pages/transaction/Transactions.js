import { useContext, useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/authContext';
import Card from '../../UI/Card';
import classes from './Transactions.module.css';

const Transactions = () => {
  const auth = useContext(AuthContext);
  const [trans, setTrans] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: `/transaction/find?key=user&value=${auth.user.username}`,
    };
    const applyData = (data) => {
      setTrans(data);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest, auth.user.username]);
  return (
    <Card className={classes.table}>
      <h2>Your Transactions</h2>
      {isLoading && <Spinner variant='dark' />}
      {!isLoading && error && <h3>{error}</h3>}
      {!isLoading && !error && trans.length === 0 ? (
        <p>No Transaction</p>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {trans.map((x, index) => (
              <tr key={x._id}>
                <td>{`0${index + 1}`}</td>
                <td>{x.hotel.name}</td>
                <td>{x.room.map((n) => n.number).join(', ')}</td>
                <td>
                  {new Date(x.dateStart).toLocaleDateString('vi-VN') +
                    ' - ' +
                    new Date(x.dateEnd).toLocaleDateString('vi-VN')}
                </td>
                <td>${x.price}</td>
                <td>{x.payment}</td>
                <td
                  className={
                    x.status === 'Booked'
                      ? classes.booked
                      : x.status === 'Checkin'
                      ? classes.checkin
                      : classes.checkout
                  }
                >
                  {x.status}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default Transactions;
