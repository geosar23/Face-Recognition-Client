import React , {useState} from 'react'
import { toast } from 'react-toastify';
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

    
    const onDelete = () => {

        //ensure delete is working
        fetch(`http://localhost:5000/user/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            closeDeleteModal();
            if(!data.success) {
                let msg = data.message || "Account didnt deleted";
                toast.error(msg)
                return; 
            }
            
            toast.success("Account deleted succesfully");
            onRouteChange('signout');
        })
        .catch(error => {
            closeDeleteModal();
            toast.error(error?.message || "Server is unable to connect");
            return;
        });
    };

    if (signIn) {
        return (
            <div>
                <DeleteAccountModal show={showDeleteModal} onHide={closeDeleteModal} user={user} onDelete={onDelete}/>
                <AdminPanelModal show={showAdminPanelModal} onHide={closeAdminPanelModal} user={user}/>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {user.name !== 'admin' && (
                        <button onClick={openConfirmationForDeleteAccountModal} className='btn btn-danger' style={{ margin: '0 10px' }}>
                            Delete account
                        </button>
                    )}
                    {user.name === 'admin' && (
                        <button onClick={openAdminPanelModal} className='btn btn-primary' style={{ margin: '0 10px' }}>
                            Admin panel
                        </button>
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
