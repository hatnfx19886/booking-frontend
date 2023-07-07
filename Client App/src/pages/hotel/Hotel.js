import './hotel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import { Spinner } from 'react-bootstrap';
import FormBooking from './FormBooking/FormBooking';
import Card from '../../UI/Card';
import AuthContext from '../../store/authContext';

const Hotel = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({
    photos: [],
  });
  const [showForm, setShowForm] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === 'l') {
      newSlideNumber =
        slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  useEffect(() => {
    const requestConfig = {
      url: `/hotel/find/${id}`,
    };
    const applyData = (data) => {
      setHotel(data);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest, id]);
  return (
    <>
      {isLoading && <Spinner variant='dark' />}
      {!isLoading && error && <h3>{error}</h3>}
      {!isLoading && !error && hotel && (
        <div className='hotelContainer'>
          {open && (
            <div className='slider'>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className='close'
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className='arrow'
                onClick={() => handleMove('l')}
              />
              <div className='sliderWrapper'>
                <img
                  src={hotel.photos[slideNumber]}
                  alt=''
                  className='sliderImg'
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className='arrow'
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <Card className='hotelWrapper'>
            <button className='bookNow'>Reserve or Book Now!</button>
            <h1 className='hotelTitle'>{hotel.name}</h1>
            <div className='hotelAddress'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel.address}</span>
            </div>
            <span className='hotelDistance'>
              Excellent location – {hotel.distance}m from center
            </span>
            <span className='hotelPriceHighlight'>
              Book a stay over ${hotel.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className='hotelImages'>
              {hotel.photos.map((photo, i) => (
                <div className='hotelImgWrapper' key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=''
                    className='hotelImg'
                  />
                </div>
              ))}
            </div>
            <div className='hotelDetails'>
              <div className='hotelDetailsTexts'>
                <h1 className='hotelTitle'>{hotel.name}</h1>
                <p className='hotelDesc'>{hotel.desc}</p>
              </div>
              <div className='hotelDetailsPrice'>
                <h2>
                  <b>${hotel.cheapestPrice}</b> (1 nights)
                </h2>
                <button
                  onClick={() => {
                    auth.isLogIn ? setShowForm(true) : navigate('/login');
                  }}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
            {showForm && auth.isLogIn && (
              <FormBooking list={hotel.rooms || []} id={id} />
            )}
          </Card>
        </div>
      )}
      {!isLoading && !error && !hotel && <h3>Hotel Not Found</h3>}
    </>
  );
};

export default Hotel;
