import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import classes from '../transaction/Transaction.module.css';
import Action from './Action';
import styles from './Hotels.module.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [update, setUpdate] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/hotel',
    };
    const applyData = (data) => setHotels(data);
    sendRequest(requestConfig, applyData);
    return setUpdate(false);
  }, [sendRequest, update]);
  return (
    <>
      <div className='flex-centered'>
        <p className={classes.title}>Hotels List</p>
        <Link to='/hotels/add'>
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
            <p>Name</p>
            <p>Type</p>
            <p>Title</p>
            <p>City</p>
            <p>Action</p>
          </div>
          {hotels.map((x) => (
            <div key={x._id} className={classes.row + ' ' + styles.row}>
              <div>
                <input type='checkbox' />
              </div>
              <p>{x._id}</p>
              <p>{x.name}</p>
              <p>{x.type}</p>
              <p>{x.title}</p>
              <p>{x.city}</p>
              <Action
                id={x._id}
                name={x.name}
                update={setUpdate}
                hotel={true}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Hotels;
