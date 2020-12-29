import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NavMyOperations = (props)=>{

    return(
        <Row className="ml-3">
            <Button onClick={props.handleShowOperationEditModal}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                Nueva Operación
            </Button>
        </Row>
    )
}

export default NavMyOperations;