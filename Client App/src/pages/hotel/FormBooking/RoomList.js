import { useEffect, useState } from 'react';

const RoomList = (props) => {
  const [check, setCheck] = useState(false);
  const checkedRoom = (e) => {
    setCheck(e.target.checked);
    const room = {
      _id: props.id,
      number: props.number,
    };
    if (e.target.checked) {
      props.addRoom(room, props.price);
    } else {
      props.removeRoom(room, props.price);
    }
  };
  useEffect(() => {
    setCheck(false);
  }, [props.change]);
  return (
    <div>
      <p className='smaller'>{props.number}</p>
      <input checked={check} type='checkbox' onChange={checkedRoom} />
    </div>
  );
};

export default RoomList;
