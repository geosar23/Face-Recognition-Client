import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function DeleteAccountModal({show, onHide, onDelete, user, adminAccess}) {

    const capitalizeFirstLetter = (string) => {
        return string ? string[0]?.toUpperCase() + string.slice(1) : undefined;
    }

    const deleteUser = () => {
        //ensure delete is working
        fetch(`http://localhost:5000/user/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            onDelete(true);
            if(!data.success) {
                let msg = data.message || "Account didnt deleted";
                toast.error(msg)
                return; 
            }
            
            toast.success("Account deleted succesfully");
        })
        .catch(error => {
            onDelete(true);
            toast.error(error?.message || "Server is unable to connect");
            return;
        });
    };

    const confirmationText = adminAccess
    ? "Are you sure you want to delete the account?"
    : "Are you sure you want to delete your account?";
    const confirmationUnderText = adminAccess
    ? "All of their data will be gone forever..."
    : "All of your data will be gone forever...";

    return (
      <Modal show={show} size="lg" centered>
            <Modal.Header>
                <h3>
                    {`Delete account ${capitalizeFirstLetter(user?.name)} !`}
                </h3>
            </Modal.Header>

            <Modal.Body>
                <p>{confirmationText}</p>
                <small>{confirmationUnderText}</small>
            </Modal.Body>

            <Modal.Footer>
                <Button className="btn-secondary" onClick={onHide}>Close</Button>
                <Button className="btn btn-danger" onClick={deleteUser}>Delete</Button>
            </Modal.Footer>

      </Modal>
    );
  }

export default DeleteAccountModal;