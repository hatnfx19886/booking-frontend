import { useContext, useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/authContext';
import classes from './Login.module.css';

const Login = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const [username, setUsername] = useState(''),
    [password, setPassword] = useState('');
  const [err, setErr] = useState(error);
  const user = {
    username,
    password,
  };
  const valid = user.username?.trim() !== '' && user.password?.length >= 6;
  const loginHandler = (e) => {
    e.preventDefault();
    const requestConfig = {
      url: props.signup ? '/user/signup' : '/user/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: user,
    };
    const applyData = (data) => {
      if (props.signup) {
        navigate('/login');
      } else {
        auth.login(data);
        navigate('/', { replace: true });
      }
    };
    if (valid) {
      sendRequest(requestConfig, applyData);
    }
  };
  useEffect(() => {
    setUsername('');
    setPassword('');
    setErr(null);
  }, [props.signup]);

  useEffect(() => {
    setErr(error);
  }, [error]);
  return (
    <div className={classes.form}>
      <h2>{props.signup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={loginHandler}>
        <input
          type='text'
          onChange={(e) => {
            setUsername(e.target.value);
            setErr(null);
          }}
          value={username}
          required
        />
        <input
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
            setErr(null);
          }}
          value={password}
          required
          minLength={6}
        />
        <Button type='submit'>
          {props.signup ? 'Create Account' : 'Login'}
        </Button>
        {isLoading && <Spinner variant='dark' />}
        {!isLoading && error && <h5>{err}</h5>}
      </form>
    </div>
  );
};

export default Login;
