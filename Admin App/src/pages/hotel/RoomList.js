import { useEffect, useState } from 'react';

const RoomList = (props) => {
  const [check, setCheck] = useState(false);
  const checkRoom = (e) => {
    if (e.target.checked) {
      setCheck(true);
      props.addRoom(props.id);
    } else {
      setCheck(false);
      props.removeRoom(props.id);
    }
  };
  useEffect(() => setCheck(props.check ? true : false), [props.check]);
  return (
    <div>
      <input checked={check} type='checkbox' onChange={checkRoom} />
      <label>{props.title}</label>
    </div>
  );
};

export default RoomList;
