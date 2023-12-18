import React , {useState} from 'react'
import DeleteAccountModal from '../../Modals/DeleteAccountModal/DeleteAccountModal';
import AdminPanelModal from '../../Modals/AdminPanelModal/AdminPanelModal';
import './navigation.css'

const Navigation = ({ onRouteChange, signIn, user}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAdminPanelModal, setShowAdminPanelModal] = useState(false);

    const openConfirmationForDeleteAccountModal = () => {
        setShowDeleteModal(true)
    }

    const openAdminPanelModal = () => {
        setShowAdminPanelModal(true)
    }

    const closeDeleteModal = () =>  {
        setShowDeleteModal(false);
    }

    const closeAdminPanelModal = () =>  {
        setShowAdminPanelModal(false);
    }

    
    const onDelete = (event) => {
        closeDeleteModal();
        if(event) {
            onRouteChange('signout');
        }
    };

    if (signIn) {
        return (
            <div>               
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {user.name !== 'admin' && (
                        <div>
                            <DeleteAccountModal show={showDeleteModal} onHide={closeDeleteModal} user={user} onDelete={onDelete}/>
                            <button onClick={openConfirmationForDeleteAccountModal} className='btn btn-danger' style={{ margin: '0 10px' }}>
                                <i className="fa fa-trash" aria-hidden="true"></i> Delete account
                            </button>
                        </div>
                    )}
                    {user.name === 'admin' && (
                        <div>
                            {showAdminPanelModal ? <AdminPanelModal show={showAdminPanelModal} onHide={closeAdminPanelModal} user={user}/> : ""}
                            <button onClick={openAdminPanelModal} className='btn btn-primary' style={{ margin: '0 10px' }}>
                                <i className="fa fa-gear" aria-hidden="true"></i> Admin panel
                            </button>
                        </div>
                    )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p onClick={() => onRouteChange('signout')} className='btn btn-dark m-3'><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</p>
                    </div>
                </nav>
            </div>
        )
    } else {
        return (
            <nav>
                <div className='d-flex flex-row-reverse'>
                    <p onClick={() => onRouteChange('register')} className='btn btn-outline-dark m-2'><i className="fa-solid fa-circle-user"></i> Create new account</p>
                    <p onClick={() => onRouteChange('signin')} className='btn btn-outline-dark m-2'><i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In</p>
                </div>
            </nav>
        )
    }
}

export default Navigation;
