import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function LogoutModal() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    // deactive token upon logout
    async function handleSubmit() {
        await localStorage.removeItem('tokenId');
        await localStorage.removeItem('userId');
        await localStorage.removeItem('tokenUsername');
        await window.location.replace('/')
    }


    return (
        <div>
        <Button color='danger'onClick={toggle}>Logout</Button>

        <Modal isOpen={modal} toggle={toggle} style={{ backgroundColor:'white'}}>
            <ModalHeader toggle={toggle}>Logout Confirmation</ModalHeader>
            <ModalBody>
                Are you sure to logout ?
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>
                Cancel
            </Button>{' '}
            <Button style={{backgroundColor:"primary"}}
                onClick={async () => {
                        await toggle()
                        await handleSubmit()
                    }}>
                Logout
            </Button>

            </ModalFooter>
        </Modal>
        </div>
    );
}

export default LogoutModal;