import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/authContext';
import classes from './Login.module.css';

const Login = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const [errs, setErrs] = useState([]);
  const usernameInput = useRef(),
    passwordInput = useRef();

  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };
    const requestConfig = {
      url: '/user/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: user,
    };
    const applyData = (data) => {
      auth.login(data);
    };
    const usernameValid = user.username.trim() !== '',
      passwordValid = user.password.length >= 6;
    if (!usernameValid) {
      setErrs((prev) => [
        ...prev,
        'Your username is empty! Please input a valid username',
      ]);
    }
    if (!passwordValid) {
      setErrs((prev) => [...prev, 'Your password must be atlesss 6 chracters']);
    }
    if (usernameValid && passwordValid) {
      sendRequest(requestConfig, applyData);
    }
  };
  useEffect(() => {
    error && setErrs([error]);
  }, [error]);

  return (
    <div className={classes.form}>
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
        <input ref={usernameInput} type='text' required />
        <input ref={passwordInput} type='password' minLength={6} required />
        <Button type='submit' disabled={isLoading}>
          Login
        </Button>
        {isLoading && <Spinner variant='dark' />}
        <Modal
          show={errs.length !== 0}
          onHide={() => setErrs([])}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Waring !</Modal.Title>
          </Modal.Header>
          <Modal.Body className='centered'>
            {errs.map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setErrs([])}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default Login;
