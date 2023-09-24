import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteAccountModal({show, onHide, onDelete, user}) {

    const capitalizeFirstLetter = (string) => {
        return string ? string[0]?.toUpperCase() + string.slice(1) : undefined;
    }

    return (
      <Modal show={show} size="lg" centered>
            <Modal.Header>
                <h3>
                    {`Delete account ${capitalizeFirstLetter(user?.name)} !`}
                </h3>
            </Modal.Header>

            <Modal.Body>
                <p>
                    Are you sure you want to delete your account ?
                </p>
                <small>All of your data will be gone forever...</small>
            </Modal.Body>

            <Modal.Footer>
                <Button className="btn-secondary" onClick={onHide}>Close</Button>
                <Button className="btn btn-danger" onClick={onDelete}>Delete</Button>
            </Modal.Footer>

      </Modal>
    );
  }

export default DeleteAccountModal;