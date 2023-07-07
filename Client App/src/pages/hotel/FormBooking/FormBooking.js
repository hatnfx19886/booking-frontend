import { useContext, useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../../hooks/useHttp';
import AuthContext from '../../../store/authContext';
import classes from './FormBooking.module.css';
import RoomList from './RoomList';

const FormBooking = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttp();
  const [fullName, setFullName] = useState(auth.user.fullName || ''),
    [email, setEmail] = useState(auth.user.email || ''),
    [phoneNumber, setPhoneNumber] = useState(auth.user.phoneNumber || ''),
    [cardNumber, setCardNumber] = useState(auth.user.cardNumber || '');
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [rooms, setRooms] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [roomPrice, setRoomPrice] = useState(0);
  const [payment, setPayment] = useState('Select Payment Method');
  const addRoom = (room, price) => {
    setRooms((prev) => [...prev, room]);
    setRoomPrice((prev) => (prev += price));
  };
  const removeRoom = (room, price) => {
    setRooms((prev) =>
      prev.filter((x) => x.number !== room.number && x._id !== room._id)
    );
    setRoomPrice((prev) => (prev -= price));
  };
  const total =
    ((date[0].endDate - date[0].startDate) / 86400000 + 1) * roomPrice;
  const user = {
    ...auth.user,
    fullName,
    email,
    phoneNumber,
    cardNumber,
  };

  const transaction = {
    user: auth.user.username,
    hotel: props.id,
    room: rooms,
    dateStart: date[0].startDate,
    dateEnd: date[0].endDate,
    price: total,
    payment,
    status: 'Booked',
  };
  const valid = transaction.payment !== 'Select Payment Method';
  const reserveHandler = (e) => {
    e.preventDefault();
    if (valid) {
      const requestConfig = {
        url: '/transaction',
        method: 'POST',
        headers: { 'ConTent-Type': 'application/json' },
        body: {
          user,
          transaction,
        },
      };
      const applyData = () => {
        auth.login(user);
        navigate('/transactions');
      };
      sendRequest(requestConfig, applyData);
    }
  };
  useEffect(() => {
    const requestConfig = {
      url: `/transaction/find?key=hotel&value=${props.id}`,
    };
    const applyData = (data) => {
      setTransactions(data || []);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest, props.id]);

  let bookedRooms = [];
  transactions
    .filter(
      (x) =>
        new Date(x.dateStart) <= date[0].endDate &&
        new Date(x.dateEnd) >= date[0].startDate
    )
    .map((x) => x.room.forEach((n) => bookedRooms.push(n)));
  return (
    <form className={classes.container} onSubmit={reserveHandler}>
      <div className={classes.info}>
        <div>
          <h2>Dates</h2>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setDate([item.selection]);
              setRooms([]);
              setRoomPrice(0);
            }}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        </div>
        <div className={classes.form}>
          <h2>Reserve Info</h2>
          <p>Your Full Name:</p>
          <input
            type='text'
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Full Name'
          />
          <p>Your Email:</p>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <p>Your Phone Number:</p>
          <input
            type='number'
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Phone Number'
          />
          <p>Your Identity Card Number:</p>
          <input
            type='number'
            required
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder='Card Number'
          />
        </div>
      </div>
      <h2>Select Rooms</h2>
      <div className={classes.rooms}>
        {props.list.map((x) => (
          <div key={x._id} className='flex-centered'>
            <div>
              <b className='larger'>{x.title}</b>
              <p>{x.desc}</p>
              <p>Max people: {x.maxPeople}</p>
              <h3>${x.price}</h3>
            </div>
            <div className={`flex-centered ${classes.room}`}>
              {x.roomNumbers?.filter(
                (e) =>
                  !bookedRooms.some((a) => a.number === e && a._id === x._id)
              ).length === 0 ? (
                <b>Full</b>
              ) : (
                x.roomNumbers
                  ?.filter(
                    (e) =>
                      !bookedRooms.some(
                        (a) => a.number === e && a._id === x._id
                      )
                  )
                  .map((n, i) => (
                    <RoomList
                      key={i}
                      id={x._id}
                      number={n}
                      price={x.price}
                      addRoom={addRoom}
                      removeRoom={removeRoom}
                      change={date}
                    />
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
      <h2>Total Bill: ${total}</h2>
      <select
        className={classes.payment}
        onChange={(e) => {
          setPayment(e.target.value);
        }}
      >
        <option>Select Payment Method</option>
        <option>Credit Card</option>
        <option>Cash</option>
      </select>
      <Button type='submit' disabled={!valid}>
        Reserve Now
      </Button>
      {isLoading && <Spinner variant='dark' />}
      {!isLoading && error && <h4>{error}</h4>}
    </form>
  );
};

export default FormBooking;
