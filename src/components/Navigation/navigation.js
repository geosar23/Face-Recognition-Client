import React, { useState } from 'react'
import DeleteAccountModal from '../../Modals/DeleteAccountModal/DeleteAccountModal';
import AdminPanelModal from '../../Modals/AdminPanelModal/AdminPanelModal';
import './navigation.css'

const Navigation = ({ onRouteChange, signIn, user, route }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAdminPanelModal, setShowAdminPanelModal] = useState(false);

    const openConfirmationForDeleteAccountModal = () => {
        setShowDeleteModal(true)
    }

    const openAdminPanelModal = () => {
        setShowAdminPanelModal(true)
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const closeAdminPanelModal = () => {
        setShowAdminPanelModal(false);
    }

    const onDelete = (event) => {
        closeDeleteModal();
        if (event) {
            onRouteChange('signout');
        }
    };

    if (signIn) {
        return (
            <div>
                <nav style={{ display: 'flex', justifyContent: 'space-between', height: '70px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div>
                            <button onClick={() => onRouteChange('about')} className='d-block btn btn-primary m-2 mb-3 button-120'><i className="fa-regular fa-lightbulb"></i> About</button>
                            {user.name === 'admin' ?

                                <div>
                                    {showAdminPanelModal ? <AdminPanelModal show={showAdminPanelModal} onHide={closeAdminPanelModal} user={user} /> : ""}
                                    <button onClick={openAdminPanelModal} className='d-block btn btn-primary button-120' style={{ margin: '0 10px' }}>
                                        <i className="fa fa-gear" aria-hidden="true"></i> Admin panel
                                    </button>
                                </div>

                                :

                                <div>
                                    <DeleteAccountModal show={showDeleteModal} onHide={closeDeleteModal} user={user} onDelete={onDelete} />
                                    <button onClick={openConfirmationForDeleteAccountModal} className='d-block btn btn-danger button-120' style={{ margin: '0 10px' }}>
                                        <i className="fa fa-trash" aria-hidden="true"></i> Delete account
                                    </button>
                                </div>

                            }
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div>
                            <button onClick={() => onRouteChange('home')} className='d-block btn btn-dark m-2 button-120'><i className="fa-solid fa-house"></i> Home</button>
                            <button onClick={() => onRouteChange('signout')} className='btn btn-dark m-1 button-120'><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
                        </div>
                    </div>
                </nav>
            </div>
        )
    } else {
        return (
            <nav>
                <div className='d-flex flex-row-reverse'>
                    {route !== 'register' ? <button onClick={() => onRouteChange('register')} className='btn btn-dark m-2'><i className="fa-solid fa-circle-user"></i> Create new account</button> : ""}
                    {route !== 'signin' ? <button onClick={() => onRouteChange('signin')} className='btn btn-dark m-2'><i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In</button> : ""}
                    {route !== 'about' ? <button onClick={() => onRouteChange('about')} className='btn btn-dark m-2'><i className="fa-regular fa-lightbulb"></i> About</button> : ""}
                </div>
            </nav>
        )
    }
}

export default Navigation;
