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
                        <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                    </div>
                </nav>
            </div>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '70px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </div>
            </nav>
        )
    }
}

export default Navigation;
