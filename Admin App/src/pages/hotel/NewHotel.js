import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import classes from './NewHotel.module.css';
import RoomList from './RoomList';

const NewHotel = () => {
  const navigate = useNavigate();
  const nameInput = useRef(),
    cityInput = useRef(),
    distanceInput = useRef(),
    descInput = useRef(),
    ratingInput = useRef(),
    imagesInput = useRef(),
    typeInput = useRef(),
    addressInput = useRef(),
    titleInput = useRef(),
    priceInput = useRef();
  const [featured, setFeatured] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  const [roomList, setRoomList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const id = useLocation().state?.id;

  const addRoom = (id) => setRooms((prev) => [...prev, id]);
  const removeRoom = (id) => setRooms((prev) => prev.filter((x) => x !== id));

  const sendHandler = (e) => {
    e.preventDefault();
    const hotel = {
      id,
      name: nameInput.current.value,
      type: typeInput.current.value,
      city: cityInput.current.value,
      address: addressInput.current.value,
      distance: distanceInput.current.value,
      title: titleInput.current.value,
      photos: imagesInput.current.value.split('\n'),
      desc: descInput.current.value,
      cheapestPrice: priceInput.current.value,
      rating: ratingInput.current.value,
      featured,
      rooms,
    };
    const requestConfig = {
      url: '/hotel',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: hotel,
    };
    const applyData = () => navigate('/hotels');
    sendRequest(requestConfig, applyData);
  };
  useEffect(() => {
    const requestConfig = {
      url: '/room',
    };
    const applyData = (data) => {
      setRoomList(data);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);
  useEffect(() => {
    const requestConfig = {
      url: `/hotel/find/${id}`,
    };
    const applyData = (data) => {
      nameInput.current.value = id ? data.name : '';
      typeInput.current.value = id ? data.type : '';
      cityInput.current.value = id ? data.city : '';
      addressInput.current.value = id ? data.address : '';
      distanceInput.current.value = id ? data.distance : '';
      titleInput.current.value = id ? data.title : '';
      imagesInput.current.value = id ? data.photos.join('\n') : '';
      descInput.current.value = id ? data.desc : '';
      priceInput.current.value = id ? data.cheapestPrice : '';
      ratingInput.current.value = id ? data.rating : '';
      setFeatured(id ? data.featured : false);
      setRooms(id ? data.rooms : []);
    };
    if (id) {
      sendRequest(requestConfig, applyData);
    } else applyData();
  }, [sendRequest, id]);
  return (
    <>
      <p className={classes.title}>{id ? 'Edit Hotel' : 'Add New Hotel'}</p>
      <form className={classes.form} onSubmit={sendHandler}>
        <div className={classes.grid}>
          <div>
            <p>Name</p>
            <input type='text' ref={nameInput} required />
            <p>City</p>
            <input type='text' ref={cityInput} required />
            <p>Distance from City Center</p>
            <input
              type='number'
              ref={distanceInput}
              min={10}
              step={10}
              required
            />
            <p>Description</p>
            <input type='text' ref={descInput} required />
            <p>Rating</p>
            <input
              type='number'
              ref={ratingInput}
              min={0}
              max={5}
              step={0.1}
              required
            />
            <p>Images (Give line break between photo links)</p>
            <textarea
              ref={imagesInput}
              placeholder='Give line break between photo links'
              required
            />
          </div>
          <div>
            <p>Type</p>
            <input type='text' ref={typeInput} required />
            <p>Address</p>
            <input type='text' ref={addressInput} required />
            <p>Title</p>
            <input type='text' ref={titleInput} required />
            <p>Price</p>
            <input type='number' ref={priceInput} min={1} required />
            <p>Featured</p>
            <select
              onChange={(e) =>
                e.target.value === 'Yes'
                  ? setFeatured(true)
                  : setFeatured(false)
              }
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
        </div>
        <p>Rooms</p>
        <div className={classes.room}>
          {roomList.map((x) => (
            <RoomList
              key={x._id}
              title={x.title}
              id={x._id}
              addRoom={addRoom}
              removeRoom={removeRoom}
              check={rooms.includes(x._id)}
            />
          ))}
        </div>
        <button type='submit'>{id ? 'Save Change' : 'Add'}</button>
        {isLoading && <Spinner variant='dark' />}
        {!isLoading && error && <p>{error}</p>}
      </form>
    </>
  );
};

export default NewHotel;
