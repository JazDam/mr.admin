import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const OperationFilter = (props) => {

    const [categories, setCategories] = useState([{ id: '', category: 'Todas' }]);
    const [type, setType] = useState([{ id: '', type: 'Todos' }]);

    const categoryRef = useRef('null');
    const typeRef = useRef('null');

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

    const categoriesOptions = () => {

        let categorias = categories.map(category => {
            return (
                <option value={category.id}>
                    { category.category}
                </option >
            )
        })
        categorias.unshift(<option value=''>
            Todas
                            </option>);
        return categorias;
    }

    const typeOptions = () => {

        let types = type.map(type => {
            return (
                <option value={type.id}>
                    { type.type}
                </option >
            )
        })
        types.unshift(<option value=''>
            Todos
                            </option>);
        return types;
    }

    const handleFilterChange = () => {

        props.onFilterChange(
            {
                category: categoryRef.current.value,
                type: typeRef.current.value
            }
        )
    }

    return (
        <Row className="my-3 d-flex justify-content-center m-0 bg-light p-3">
            <Col xs={12} md={11} lg={8}>
                <Form>
                    <Row>
                        <Col xs={12} md={5}>
                            <Form.Group>
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control as="select"
                                    onChange={handleFilterChange}
                                    ref={categoryRef}>
                                    {categoriesOptions()}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={5}>
                            <Form.Group>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select"
                                    onChange={handleFilterChange}
                                    ref={typeRef}>
                                    {typeOptions()}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}
export default OperationFilter;