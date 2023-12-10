import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import './AdminPanelModal.css'
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';
import EditAccountModal from '../EditAccountModal/EditAccountModal';

function AdminPanelModal({ show, onHide }) {

    const [userData, setUserData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        const authorizationToken = window.localStorage.getItem('token');
        fetch('/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationToken
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data)
            })
            .catch((error) => console.error('Error fetching user data:', error));
    }


    const openConfirmationForDeleteAccountModal = (user) => {
        setSelectedUser(user)
        setShowDeleteModal(true)
    }

    const openEditUserModal = (user) => {
        setSelectedUser(user)
        setShowEditModal(true)
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
    }

    const onDelete = () => {
        closeDeleteModal();
        getUserData();
    }

    const onEdit = () => {
        closeEditModal();
        getUserData();
    }

    return (
        <Modal dialogClassName='dark-modal' show={show} size="fullscreen" centered onHide={onHide}>
            <Modal.Header closeButton>
                <h3>Admin panel</h3>
            </Modal.Header>

            <Modal.Body>
                {showDeleteModal ? <DeleteAccountModal show={showDeleteModal} onHide={closeDeleteModal} user={selectedUser} adminAccess={true} onDelete={onDelete} /> : ""}
                {showEditModal ? <EditAccountModal show={showEditModal} onHide={closeEditModal} user={selectedUser} adminAccess={true} onEdit={onEdit} /> : ""}
                <div className="sectionContainer">
                    <div className="flex">
                        <h4>Users Management</h4>
                        <span className="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Reload users" onClick={() => getUserData()} >
                            <i className="text-warning fa fa-refresh p-2" aria-hidden="true"></i>
                        </span>
                    </div>
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
                                            {user.name !== 'admin' && (
                                                <div> 
                                                    <button className="m-2 btn btn-sm btn-primary" onClick={() => openEditUserModal(user)}>Edit user</button>
                                                    <button className="m-2 btn btn-sm btn-warning">Reset password</button>
                                                    <button className="m-2 btn btn-sm btn-danger" onClick={() => openConfirmationForDeleteAccountModal(user)}>Delete user</button>
                                                </div>
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
