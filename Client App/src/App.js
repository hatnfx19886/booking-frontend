import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/search/Search';
import Login from './pages/login/Login';
import Transactions from './pages/transaction/Transactions';
import AuthContext from './store/authContext';
import ScrollToTop from './UI/ScrollToTop';

function App() {
  const auth = useContext(AuthContext);
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route
          path='/login'
          element={auth.isLogIn ? <Navigate replace to='/' /> : <Login />}
        />
        <Route path='/register' element={<Login signup={true} />} />
        <Route
          path='/transactions'
          element={
            auth.isLogIn ? <Transactions /> : <Navigate replace to='/login' />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
