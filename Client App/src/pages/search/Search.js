import './list.css';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import SearchItem from './searchItem/SearchItem';
import useHttp from '../../hooks/useHttp';
import { Spinner } from 'react-bootstrap';

const List = () => {
  const location = useLocation(),
    [date, setDate] = useState(location.state.date),
    [openDate, setOpenDate] = useState(false),
    [destination, setDestination] = useState(location.state.destination),
    [adult, setAdult] = useState(location.state.options.adult),
    [children, setChildren] = useState(location.state.options.children),
    [room, setRoom] = useState(location.state.options.room),
    [hotels, setHotels] = useState([]),
    [trans, setTrans] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: '/search',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        city: destination,
        startDate: date[0].startDate,
        endDate: date[0].endDate,
      },
    };
    const applyData = (data) => {
      setHotels(data.hotels);
      setTrans(data.trans);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest, date, destination]);

  for (const hotel in hotels) {
    for (const tran in trans) {
      for (const room in hotel?.rooms) {
        room?.roomNumbers.forEach((number, index) => {
          if (
            hotel._id === tran.hotel &&
            tran.room.find((x) => x._id === room._id && x.number === number)
          ) {
            room.roomNumbers.splice(index, 1);
          }
        });
      }
    }
  }

  const results = hotels.filter(
    (x) =>
      x.rooms.reduce((a, e) => (a += e.maxPeople), 0) >=
        Number(adult) + Number(children) &&
      x.rooms.map((e) => e.roomNumbers).flat().length >= room
  );
  return (
    <div>
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input
                type='text'
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder='Where are you going ?'
              />
            </div>
            <div className='lsItem'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {date[0].startDate.toLocaleDateString('vi-VN') +
                  ' to ' +
                  date[0].endDate.toLocaleDateString('vi-VN')}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adult</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    value={adult}
                    onChange={(e) => setAdult(e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Children</span>
                  <input
                    type='number'
                    min={0}
                    className='lsOptionInput'
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Room</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          {isLoading && <Spinner variant='dark' />}
          {!isLoading && error && <h4>{error}</h4>}
          {!isLoading && !error && results.length === 0 ? (
            <h3>No Hotel Found</h3>
          ) : (
            <div className='listResult'>
              {results.map((x) => (
                <SearchItem key={x._id} item={x} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
