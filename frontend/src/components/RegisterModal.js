import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const RegisterModal = (props)=>{

    const [userEmailRegister, setUserEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const handleUserEmailRegisterChange = (event)=>{
        setUserEmailRegister(event.target.value);
    }
    const handlePasswordRegisterChange = (event)=>{
        setPasswordRegister(event.target.value);
    }

    const handleRegister = ()=>{
        const registerData = new FormData();

        registerData.append('userEmailRegister', userEmailRegister);
        registerData.append('passwordRegister', passwordRegister);

        fetch('http://localhost:8888/register', {
            method: 'POST',
            body: registerData,
            credentials: 'include'
        }).then(response => response.json())
        .then(data => {
            props.handleHide();
            Swal.fire({
                text: data.message,
                icon: 'success'
            })
            console.log(data);
        })
        .catch(err =>{;
            console.log('error');
        })
    }

    return (
        <Modal show={props.show} onHide={props.handleHide}>
            <Modal.Header closeButton >
                <Modal.Title>Registro</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                        value={userEmailRegister}
                        onChange={handleUserEmailRegisterChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password"
                        value={passwordRegister}
                        onChange={handlePasswordRegisterChange}
                    />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    onClick={props.handleHide}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={handleRegister}
                >
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default RegisterModal;