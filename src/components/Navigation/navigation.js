import React , {useState} from 'react'
import { toast } from 'react-toastify';
import DeleteAccountModal from '../../Modals/DeleteAccountModal/DeleteAccountModal';

const Navigation = ({ onRouteChange, signIn, user}) => {

    const [showModal, setShowModal] = useState(false);

    const openConfirmationForDeleteAccountModal = () => {
        setShowModal(true)
    }

    const closeModal = () =>  {
        setShowModal(false);
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
            closeModal();
            if(!data.success) {
                let msg = data.message || "Account didnt deleted";
                toast.error(msg)
                return; 
            }
            
            toast.success("Account deleted succesfully");
            onRouteChange('signout');
        })
        .catch(error => {
            closeModal();
            toast.error(error?.message || "Server is unable to connect");
            return;
        });
    };

    if (signIn) {
        return (
            <div>
                 <DeleteAccountModal show={showModal} onHide={closeModal} user={user} onDelete={onDelete}/>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <p onClick={openConfirmationForDeleteAccountModal} className='btn btn-danger' style={{ margin: '0 10px' }}>Delete account</p>
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
