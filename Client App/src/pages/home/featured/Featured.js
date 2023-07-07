import { useEffect, useState } from 'react';
import useHttp from '../../../hooks/useHttp';
import classes from './Featured.module.css';

const Featured = (props) => {
  const [hanoi, setHanoi] = useState(0),
    [hcm, setHcm] = useState(0),
    [danang, setDanang] = useState(0),
    { sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/hotel/couter?key=city',
    };
    const applyData = (data) => {
      setHanoi(data.hanoi);
      setHcm(data.hcm);
      setDanang(data.danang);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);
  return (
    <div className={classes.featured}>
      <div className={classes.featuredItem}>
        <img src='HaNoi.jpg' alt='Ha Noi City' />
        <div className={classes.featuredTitles}>
          <h1>Ha Noi</h1>
          <h2>{hanoi} properties</h2>
        </div>
      </div>
      <div className={classes.featuredItem}>
        <img src='HCM.jpg' alt='Ho Chi Minh City' />
        <div className={classes.featuredTitles}>
          <h1>Ho Chi Minh</h1>
          <h2>{hcm} properties</h2>
        </div>
      </div>
      <div className={classes.featuredItem}>
        <img src='DaNang.jpg' alt='Da Nang City' />
        <div className={classes.featuredTitles}>
          <h1>Da Nang</h1>
          <h2>{danang} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
