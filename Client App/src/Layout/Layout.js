import Footer from './footer/Footer';
import Header from './header/Header';
import MailList from './mailList/MailList';
import Navbar from './navbar/Navbar';

const Layout = (props) => {
  return (
    <>
      <div className='blue-background'>
        <Navbar />
        <Header />
      </div>
      <main>{props.children}</main>
      <MailList />
      <Footer />
    </>
  );
};

export default Layout;
