const HotelList = (props) => {
  const checkHotel = (e) => {
    if (e.target.checked) {
      props.addHotel(props.id);
    } else props.removeHotel(props.id);
  };
  return (
    <div>
      <input type='checkbox' onChange={checkHotel} />
      <label>{props.title}</label>
    </div>
  );
};

export default HotelList;
