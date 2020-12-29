import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

const OperationEditModal = (props) => {

    const [operationConcept, setOperationConcept] = useState('');
    const [operationAmount, setOperationAmount] = useState('');
    const [operationDate, setOperationDate] = useState('');
    const [operationType, setOperationType] = useState('');
    const [type, setType] = useState([{ id: '', type: 'Todos' }]);
    const [operationCategory, setOperationCategory] = useState('');
    const [categories, setCategories] = useState([{ id: '', category: 'Todas' }]);

    useEffect(() => {
        fetch('http://localhost:8888/type').then(
            response => response.json()
        ).then(
            dataType => {
                setType(dataType);
            }
        )
    }, []
    )

    useEffect(() => {
        fetch('http://localhost:8888/categories').then(
            response => response.json()
        ).then(
            dataCategories => {
                setCategories(dataCategories);
            }
        )
    }, []
    )
    const typeOptions = () => {

        let types = type.map(type => {
            return (
                <option value={type.id}>
                    { type.type}
                </option >
            )
        })
        types.unshift(<option value=''>

        </option>);
        return types;
    }

    const categoriesOptions = () => {

        let categorias = categories.map(category => {
            return (
                <option value={category.id}>
                    { category.category}
                </option >
            )
        })
        categorias.unshift(<option value=''>

        </option>);
        return categorias;
    }


    const handleOperationCoceptChange = (event) => {
        setOperationConcept(event.target.value);
    }
    const handleOperationAmountChange = (event) => {
        setOperationAmount(event.target.value);
    }
    const handleOperationDateChange = (event) => {
        setOperationDate(event.target.value);
    }
    const handleOperationTypeChange = (event) => {
        setOperationType(event.target.value);
    }
    const handleOperationCategoryChange = (event) => {
        setOperationCategory(event.target.value);
    }

    const handleSave = () => {

        const formData = new FormData();
        formData.append('operationConcept', operationConcept);
        formData.append('operationAmount', operationAmount);
        formData.append('operationDate', operationDate);
        formData.append('operationType', operationType);
        formData.append('operationCategory', operationCategory);

        let url = 'http://localhost:8888/operations';
        let method = 'POST';

        if (props.idOperation) {
            url += '/' + props.idOperation;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            body: formData,
            credentials: 'include'
        }).then(response => response.json()
        ).then(data => {
            if (data.status === 'ok') {
                props.onOperationSaved(data.message);
            } else {
                Swal.fire(
                    {
                        text: data.message,
                        icon: 'error'
                    }
                )
            }
        }).catch(error => {
            console.log('Error');
        })
    }
    useEffect(
        () => {
            if (props.idOperation) {
                fetch(`http://localhost:8888/operations/` + props.idOperation).then(
                    response => response.json()
                ).then(
                    data => {
                        setOperationConcept(data.concept);
                        setOperationAmount(data.amount);
                        setOperationDate(data.date);
                        setOperationType(data.tipo);
                        setOperationCategory(data.category);
                    }
                )
            } else {
                setOperationConcept('');
                setOperationAmount('');
                setOperationDate('');
                setOperationType('');
                setOperationCategory('');
            }
        }, [props.idOperation]
    )

    return (
        <>
            
            <Modal show={props.show} onHide={props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Operación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Concepto</Form.Label>
                            <Form.Control type="text"
                                value={operationConcept}
                                onChange={handleOperationCoceptChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Monto</Form.Label>
                            <Form.Control type="text"
                                value={operationAmount}
                                onChange={handleOperationAmountChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date"
                                value={operationDate}
                                onChange={handleOperationDateChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select"
                                onChange={handleOperationTypeChange}
                                value={operationType}
                            >
                                {typeOptions()}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control as="select"
                                onChange={handleOperationCategoryChange}
                                value={operationCategory}>
                                {categoriesOptions()}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>
                        Cancelar
                </Button>
                    <Button onClick={handleSave}>
                        Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default OperationEditModal;