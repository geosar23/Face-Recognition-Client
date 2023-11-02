import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import './AdminPanelModal.css'
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';

function AdminPanelModal({ show, onHide }) {

  const [userData, setUserData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserData(data)
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userData]);


    const openConfirmationForDeleteAccountModal = (data) => {
        console.log(data)
        setSelectedUser(data)
        setShowDeleteModal(true)
    }

    const closeDeleteModal = () =>  {
        setShowDeleteModal(false);
    }

    const onDelete = () => {
        closeDeleteModal();
    }

  return (
    <Modal dialogClassName='dark-modal' show={show} size="fullscreen" centered onHide={onHide}>
      <Modal.Header closeButton>
        <h3>Admin panel</h3>
      </Modal.Header>

      <Modal.Body>
        <DeleteAccountModal show={showDeleteModal} onHide={closeDeleteModal} user={selectedUser} adminAccess={true} onDelete={onDelete}/>
        <div className="sectionContainer">
          <h4>Users Management</h4>
          <table className="table table-striped table-bordered table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Entries</th>
                <th>Score</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.entries}</td>
                  <td>{user.score}</td>
                  <td>{moment(user.joined).format()}</td>
                  <td>
                    <div>
                        <button className="m-2 btn btn-sm btn-primary">Edit user</button>
                        <button className="m-2 btn btn-sm btn-warning">Reset password</button>
                        {user.name !== 'admin' && (
                            <button className="m-2 btn btn-sm btn-danger" onClick={() => openConfirmationForDeleteAccountModal(user)}>
                                Delete user
                            </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AdminPanelModal;
