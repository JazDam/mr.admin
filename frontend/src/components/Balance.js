import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';


const Balance = (props) => {

    const [balance, setBalance] = useState('');
    const [graph, setGraph] = useState([]);
    const COLORS = ['#0096c7', '#03045e', '#90e0ef', '#001233']

    let url = 'balance/user/' + props.user.id;
    const chargeBalance = () => {

        fetch(`http://localhost:8888/${url}`).then(
            response => response.json()
        ).then(
            data => {
                setBalance(data)
                console.log(data);
            }
        )

    }
    let urlGraph = 'balance/graph/user/' + props.user.id;
    const chargeGraph = () => {

        fetch(`http://localhost:8888/${urlGraph}`).then(
            response => response.json()
        ).then(
            data => {
                setGraph(data)
                console.log(data);
            }
        )

    }

    useEffect(chargeBalance, [url, props.user.id, props.handleBalance]);
    useEffect(chargeGraph, [urlGraph, props.user.id, props.handleBalance]);

    return (

        <>
            <Container>
                <Row>
                        <Col>
                            <h3
                            style={{color: "#0096c7", marginTop: "55px"}}
                            >Balance actual</h3>
                        </Col>
                        <Col >
                            <h1 value={balance}
                                handleChange={props.handleBalance}
                                style={{fontSize: "100px", color: "#0096c7"}}
                            >${balance.result}</h1>
                        </Col>
                    
                    <Col>
                        <PieChart width={500} height={300}>
                            <Pie
                                data={graph}
                                dataKey="quantity"
                                nameKey="month"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {
                                    graph.map(
                                        (entry, index) =>
                                            <Cell key={`celd-${index}`}
                                                fill={COLORS[index]}
                                            />
                                    )
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Col>
                </Row>
            </Container>
        </>
    )

}
export default Balance;