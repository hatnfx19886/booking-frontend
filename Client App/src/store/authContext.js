import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLogIn: false,
  user: {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser);
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  }, [setUser]);
  const login = (user) => {
    setUser(user);
    setIsLogIn(true);
    localStorage.setItem('user', JSON.stringify(user));
  };
  const logout = () => {
    setIsLogIn(false);
    localStorage.removeItem('user');
  };
  const auth = {
    user,
    isLogIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
