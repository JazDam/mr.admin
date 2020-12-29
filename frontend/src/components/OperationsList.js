import React, { useState, useEffect } from 'react';
import Operation from './Operation';
import OperationEditModal from './OperationEditModal';
import NavMyOperations from './NavMyOperations';
import Swal from 'sweetalert2';
import OperationFilter from './OperationFilter';
import Balance from './Balance';

const OperationList = (props) => {

    const [operations, setOperations] = useState([])

    const [showOperationEditModal, setShowOperationEditModal] = useState(false);

    const [selectedOperation, setSelectedOperation] = useState(null);

    const handleFilterChange = filter =>{
        props.onFilterChange(filter)
    }
    
    const handleHideOperationEditModal = ()=>{
        setSelectedOperation(null);
        setShowOperationEditModal(false);
    }
    const onShowOperationEditModal = ()=>{
        setSelectedOperation(null);
        setShowOperationEditModal(true);
    }

    const handleOperationSaved = (message)=>{
        setShowOperationEditModal(false);
        chargeOperationList();
        Swal.fire(
            {
                text: message,
                icon: 'success'
            }
        )
    }

    let endpoint = 'operations';
    if(props.user && props.type === 'misoperaciones' ){
        endpoint = 'operations/user/' + props.user.id;
    }

    const chargeOperationList = ()=>{

        const filterParams = new URLSearchParams(props.filters);

            fetch(`http://localhost:8888/${endpoint}?${filterParams}`).then(
                response => response.json()
            ).then(
                data => {
                    setOperations(data)
                }
            )
        
    }

    useEffect(chargeOperationList, [endpoint, props.user, props.filters]);

    const handleEditClick = (idOperation)=>{
        setSelectedOperation(idOperation);
        setShowOperationEditModal(true);
    }

    const handleDeleteClick = (idOperation)=>{
        Swal.fire(
            {
                title: '¿Realmente deseas eliminar la operación?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }
        ).then(result =>{
            if(result.value){
                fetch(`http://localhost:8888/operations/${idOperation}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(data =>{
                    if(data.status === 'ok'){
                        Swal.fire(
                            {
                                text: data.message,
                                icon: 'success'
                            }
                        );
                        chargeOperationList();
                        
                    }else{
                        Swal.fire(
                            {
                                text: data.message,
                                icon: 'error'
                            }
                        )
                    }
                })
            }
        })
    }

    return (
        <>
                <Balance user={props.user} 
                         handleBalance={chargeOperationList}/> 
                <NavMyOperations handleShowOperationEditModal={onShowOperationEditModal}/>
                <OperationFilter onFilterChange={handleFilterChange}/>
            
                {
                    operations.map(
                        operation => {
                            return(
                                <Operation
                                id={operation.id}
                                concept={operation.concept}
                                amount={operation.amount}
                                date={operation.date}
                                tipo={operation.tipo}
                                category={operation.category}
                                type={props.type}
                                onEditClick={handleEditClick} 
                                onDeleteClick={handleDeleteClick}
                                 />
                            )
                        }
                    )
              }
            <OperationEditModal show={showOperationEditModal}
                                handleHide={handleHideOperationEditModal} 
                                onOperationSaved={handleOperationSaved}
                                idOperation={selectedOperation}/>
            
        </>
    )
}
export default OperationList;