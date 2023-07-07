import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import Action from '../hotel/Action';
import classes from '../transaction/Transaction.module.css';
import styles from './Rooms.module.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [update, setUpdate] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/room',
    };
    const applyData = (data) => setRooms(data);
    sendRequest(requestConfig, applyData);
    return setUpdate(false);
  }, [sendRequest, update]);
  return (
    <>
      <div className='flex-centered'>
        <p className={classes.title}>Rooms List</p>
        <Link to='/rooms/add'>
          <Button variant='outline-success'>Add New</Button>
        </Link>
      </div>
      {isLoading && <Spinner variant='dark' />}
      {!isLoading && error && <h3>{error}</h3>}
      {!isLoading && !error && (
        <div className={classes.table}>
          <div className={classes.row + ' ' + classes.head + ' ' + styles.row}>
            <div>
              <input type='checkbox' />
            </div>
            <p>ID</p>
            <p>Title</p>
            <p>Description</p>
            <p>Price</p>
            <p>Max People</p>
            <p>Action</p>
          </div>
          {rooms.map((x) => (
            <div key={x._id} className={classes.row + ' ' + styles.row}>
              <div>
                <input type='checkbox' />
              </div>
              <p>{x._id}</p>
              <p>{x.title}</p>
              <p>
                {x.desc.length > 60 ? x.desc.substring(0, 60) + '...' : x.desc}
              </p>
              <p>{x.price}</p>
              <p>{x.maxPeople}</p>
              <Action id={x._id} name={x.title} update={setUpdate} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Rooms;
