import { useEffect, useState } from 'react';
import useHttp from '../../../hooks/useHttp';
import './propertyList.css';

const PropertyList = () => {
  const [hotels, setHotels] = useState(0),
    [apartments, setApartments] = useState(0),
    [resorts, setResorts] = useState(0),
    [villas, setVillas] = useState(0),
    [cabins, setCabins] = useState(0),
    { sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/hotel/couter?key=type',
    };
    const applyData = (data) => {
      setHotels(data.hotels);
      setApartments(data.apartments);
      setResorts(data.resorts);
      setVillas(data.villas);
      setCabins(data.cabins);
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);
  return (
    <div className='pList'>
      <div className='pListItem'>
        <img
          src='https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o='
          alt=''
          className='pListImg'
        />
        <div className='pListTitles'>
          <h1>Hotels</h1>
          <h2>{hotels} hotels</h2>
        </div>
      </div>
      <div className='pListItem'>
        <img
          src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg'
          alt=''
          className='pListImg'
        />
        <div className='pListTitles'>
          <h1>Apartments</h1>
          <h2>{apartments} hotels</h2>
        </div>
      </div>
      <div className='pListItem'>
        <img
          src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg'
          alt=''
          className='pListImg'
        />
        <div className='pListTitles'>
          <h1>Resorts</h1>
          <h2>{resorts} hotels</h2>
        </div>
      </div>
      <div className='pListItem'>
        <img
          src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg'
          alt=''
          className='pListImg'
        />
        <div className='pListTitles'>
          <h1>Villas</h1>
          <h2>{villas} hotels</h2>
        </div>
      </div>
      <div className='pListItem'>
        <img
          src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg'
          alt=''
          className='pListImg'
        />
        <div className='pListTitles'>
          <h1>Cabins</h1>
          <h2>{cabins} hotels</h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
