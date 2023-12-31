import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../../UI/Card';
import './header.css';

const Header = () => {
  return (
    <Card className='headerContainer'>
      <div className='headerList'>
        <div className='headerListItem active'>
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </div>
        <div className='headerListItem'>
          <FontAwesomeIcon icon={faPlane} />
          <span>Flights</span>
        </div>
        <div className='headerListItem'>
          <FontAwesomeIcon icon={faCar} />
          <span>Car rentals</span>
        </div>
        <div className='headerListItem'>
          <FontAwesomeIcon icon={faBed} />
          <span>Attractions</span>
        </div>
        <div className='headerListItem'>
          <FontAwesomeIcon icon={faTaxi} />
          <span>Airport taxis</span>
        </div>
      </div>
    </Card>
  );
};

export default Header;
