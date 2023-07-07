import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useHttp from '../../../hooks/useHttp';
import './featuredProperties.css';

const FeaturedProperties = () => {
  const [hotelList, setHotelList] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/hotel/top-rate',
    };
    const applyData = (data) => {
      setHotelList(data);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);
  return (
    <div className='fp'>
      {isLoading && <Spinner variant='dark' />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading &&
        !error &&
        hotelList.map((x) => (
          <div key={x._id} className='fpItem'>
            <img src={x.photos[0]} alt={x.name} className='fpImg' />
            <Link to={`hotels/${x._id}`}>{x.name}</Link>
            <span className='fpCity'>{x.city}</span>
            <span className='fpPrice'>Starting from ${x.cheapestPrice}</span>
          </div>
        ))}
    </div>
  );
};

export default FeaturedProperties;
