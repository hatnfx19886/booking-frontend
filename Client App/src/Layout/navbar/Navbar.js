import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/authContext';
import Card from '../../UI/Card';
import classes from './navbar.module.css';

const Navbar = () => {
  const auth = useContext(AuthContext);
  return (
    <Card className={`${classes.navbar} flex-centered`}>
      <Link to='/'>
        <p className='larger'>Booking</p>
      </Link>
      {auth.isLogIn ? (
        <div>
          <span>{auth.user.username}</span>
          <Link to='/transactions'>
            <Button variant='outline-primary'>Transactions</Button>
          </Link>
          <Button variant='outline-primary' onClick={auth.logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Link to='/register'>
            <Button variant='outline-primary'>Register</Button>
          </Link>
          <Link to='/login'>
            <Button variant='outline-primary'>Login</Button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default Navbar;
