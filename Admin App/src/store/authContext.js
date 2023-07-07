import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useHttp from '../hooks/useHttp';

const AuthContext = React.createContext({
  isLogIn: false,
  user: {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { sendRequest } = useHttp();

  const login = (data) => {
    setCookie('userId', data, { secure: true });
    setIsLogIn(true);
  };
  const logout = () => {
    removeCookie('userId');
    setIsLogIn(false);
  };
  const auth = {
    userId: cookies.userId,
    isLogIn,
    login,
    logout,
  };
  useEffect(() => {
    const id = document.cookie
      .split('; ')
      .find((x) => x.includes('userId'))
      ?.split('=')[1];
    const requestConfig = {
      url: `/user/find/${id}`,
    };
    const applyData = () => setIsLogIn(true);
    id && sendRequest(requestConfig, applyData);
  }, [sendRequest]);

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
