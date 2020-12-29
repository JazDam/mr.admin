import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginModal = (props)=>{

    const handleLoginClick = ()=>{
        let url = 'http://localhost:8888/auth';

        let params ={
            user: userName,
            password: password
        }
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()
        ).then(data =>{
            if(data.status === 'ok'){
                props.handleLoginSuccess(data.loggedUser);
                props.handleHide();
            }else{
                alert(data.message);
            }
        })
    }

    const[userName, setUserName] = useState('');
    const[password, setPassword] = useState('');

    const handleUserNameChange = (event)=>{
        setUserName(event.target.value);
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }

    return(
        <Modal show={props.show} onHide={props.handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="email"
                                  value={userName}
                                  onChange={handleUserNameChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password"
                                  value={password}
                                  onChange={handlePasswordChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                onClick={props.handleHide}
                >Cancelar
                </Button>
                <Button
                onClick={handleLoginClick}
                >Aceptar</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default LoginModal;