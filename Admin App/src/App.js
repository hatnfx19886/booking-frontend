import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Sidebar from './Sidebar/Sidebar';
import AuthContext from './store/authContext';
import ScrollToTop from './UI/ScrollToTop';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Transaction from './pages/transaction/Transaction';
import Dashboard from './pages/dashboard/Dashboard';
import Hotels from './pages/hotel/Hotels';
import Rooms from './pages/room/Rooms';
import NewHotel from './pages/hotel/NewHotel';
import NewRoom from './pages/room/NewRoom';

library.add(fas, far);
const App = () => {
  const auth = useContext(AuthContext);
  if (auth.isLogIn) {
    return (
      <Sidebar>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transactions' element={<Transaction />} />
          <Route path='/hotels' element={<Hotels />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/hotels/add' element={<NewHotel />} />
          <Route path='/rooms/add' element={<NewRoom />} />
          <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </Sidebar>
    );
  } else return <Login />;
};

export default App;
