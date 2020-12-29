import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Operation = (props) => {

    const handleEditClick = () => {
        props.onEditClick(props.id);
    }

    const handleDeleteClick = ()=>{
        props.onDeleteClick(props.id);
    }

    return (
        <> 
        <Row className="d-flex justify-content-center p-0"
         to={"/operations/" + props.id}>
            <Col xs={12} md={11} lg={8} >
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                        <Col>{props.concept}</Col>
                        <Col>${props.amount}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>   
            </Col >
      
            <Col className="d-flex justify-content-center p-0">
                <Button variant="light"
                    onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faEdit} />
                                    Editar</Button>
            </Col>
            <Col className="d-flex justify-content-center p-0">
                <Button variant="light"
                    onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                                    Eliminar </Button>
           
            </Col>
            <hr style={{width: "1300px", height: "0.0.5px", backgroundColor: "#00b4d8"}}></hr>
        
        </Row>
         
        </> 
    )
}
export default Operation;