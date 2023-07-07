import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import classes from '../hotel/NewHotel.module.css';
import HotelList from './HotelList';

const NewRoom = () => {
  const navigate = useNavigate();
  const id = useLocation().state?.id;
  const titleInput = useRef(),
    priceInput = useRef(),
    roomsInput = useRef(),
    descInput = useRef(),
    peopleInput = useRef();
  const [hotelList, setHotelList] = useState([]);
  const [hotels, setHotels] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  const addHotel = (id) => setHotels((prev) => [...prev, id]);
  const removeHotel = (id) => setHotels((prev) => prev.filter((x) => x !== id));

  const sendHandler = (e) => {
    e.preventDefault();
    const room = {
      title: titleInput.current.value,
      price: priceInput.current.value,
      desc: descInput.current.value,
      maxPeople: peopleInput.current.value,
      roomNumbers: roomsInput.current.value.split(','),
      hotels,
    };
    const requestConfig = {
      url: '/room',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: room,
    };
    const applyData = () => navigate('/rooms');
    sendRequest(requestConfig, applyData);
  };

  useEffect(() => {
    const requestConfig = {
      url: '/hotel',
    };
    const applyData = (data) => setHotelList(data);
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);

  useEffect(() => {
    const requestConfig = {
      url: `/room/find/${id}`,
    };
    const applyData = (data) => {
      titleInput.current.value = id ? data.title : '';
      priceInput.current.value = id ? data.price : '';
      descInput.current.value = id ? data.desc : '';
      peopleInput.current.value = id ? data.maxPeople : '';
      roomsInput.current.value = id ? data.roomNumbers.join(',') : '';
    };
    id ? sendRequest(requestConfig, applyData) : applyData();
  }, [sendRequest, id]);
  return (
    <>
      <p className={classes.title}>{id ? 'Edit' : 'Add New'} Room</p>
      <form className={classes.form} onSubmit={sendHandler}>
        <div className={classes.grid}>
          <div>
            <p>Title</p>
            <input type='text' ref={titleInput} required />
            <p>Price</p>
            <input type='number' ref={priceInput} min={1} required />
            <p>Rooms (Give comma between room numbers)</p>
            <textarea
              ref={roomsInput}
              placeholder='Give comma between room numbers'
              required
            />
          </div>
          <div>
            <p>Description</p>
            <input type='text' ref={descInput} required />
            <p>Max People</p>
            <input type='number' ref={peopleInput} min={1} step={1} required />
          </div>
        </div>
        {!id && (
          <>
            <p>Select Hotel to add this room</p>
            <div className={classes.room}>
              {hotelList.map((x) => (
                <HotelList
                  key={x._id}
                  id={x._id}
                  title={x.title}
                  addHotel={addHotel}
                  removeHotel={removeHotel}
                />
              ))}
            </div>
          </>
        )}
        <button type='submit'>{id ? 'Save Change' : 'Add'}</button>
        {isLoading && <Spinner variant='dark' />}
        {!isLoading && error && <p>{error}</p>}
      </form>
    </>
  );
};

export default NewRoom;
