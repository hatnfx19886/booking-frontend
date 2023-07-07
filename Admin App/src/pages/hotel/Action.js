import { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

const Action = ({ id, name, update, hotel }) => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttp();
  const [show, setShow] = useState(false);
  const deleteHandler = () => {
    const requestConfig = {
      url: hotel ? `/hotel/delete/${id}` : `/room/delete/${id}`,
    };
    const applyData = () => {
      setShow(false);
      update(true);
    };
    sendRequest(requestConfig, applyData);
  };
  return (
    <div>
      <Button variant='outline-danger' onClick={() => setShow(true)}>
        Delete
      </Button>
      <Button
        variant='outline-warning'
        onClick={() =>
          navigate(hotel ? '/hotels/add' : '/rooms/add', { state: { id } })
        }
      >
        Edit
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {hotel ? 'Hotel' : 'Room'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='centered'>
          <p>{name} will be deleted.</p>
          <b> Are you sure ?</b>
          <div>
            {isLoading && <Spinner variant='dark' />}
            {!isLoading && error && <p>{error}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Action;
