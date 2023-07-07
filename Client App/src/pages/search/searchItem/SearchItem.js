import { useNavigate } from 'react-router-dom';
import './searchItem.css';
const SearchItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className='searchItem'>
      <img src={item.photos[0]} alt={item.name} className='siImg' />
      <div className='siDesc'>
        <h1 className='siTitle'>{item.name}</h1>
        <span className='siDistance'>{item.distance}m from center</span>
        <span className='siTaxiOp'>{item.city}</span>
        <span className='siSubtitle'>{item.type}</span>
        <span className='siFeatures'>
          {item.desc.substring(0, 100) + ' ...'}
        </span>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <span></span>
          <button>{item.rating}</button>
        </div>
        <div className='siDetailTexts'>
          <span className='siPrice'>${item.cheapestPrice}</span>
          <span className='siTaxOp'>Includes taxes and fees</span>
          <button
            className='siCheckButton'
            onClick={() => navigate(`/hotels/${item._id}`)}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
