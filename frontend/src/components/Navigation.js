import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import img from '../img/logo.png';


const Navigation = (props) => {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleHideLoginModal = ()=>{
        setShowLoginModal(false);
    }
    const handleShowLoginModal = ()=>{
        setShowLoginModal(true);
    }

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const handleHideRegisterModal = ()=>{
        setShowRegisterModal(false);
    }
    const handleShowRegisterModal = ()=>{
        setShowRegisterModal(true);
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Link to={"/"} className="navbar-brand">
                <img  alt="logo" src={img} style={{height: "2rem", marginRight: "5px"}}></img>
                    <Navbar.Text>Mr. admin</Navbar.Text>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {!props.user
                            ?
                            <>
                            <Button
                               onClick={handleShowLoginModal}
                               style={{marginRight: "5px"}}
                            >Iniciar sesión</Button>
                            <Button
                               onClick={handleShowRegisterModal}
                            >Registrarse</Button>
                            </>
                            :
                            <>
                                <NavDropdown alignRight title={props.user.nombre} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={props.handleLogout}>Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <LoginModal show={showLoginModal} 
                        handleHide={handleHideLoginModal}
                        handleLoginSuccess={props.handleLoginSuccess}
            />
            <RegisterModal show={showRegisterModal} 
                           handleHide={handleHideRegisterModal}
            />
        </>
    )
}
export default Navigation;