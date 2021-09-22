import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Card } from 'react-bootstrap'
import { pedidosType } from '../Assets/data'
import { useCrearPedido } from '../Context/CrearPedidoContext'

const CrearPedidoType = () => {
    const { handlePedidoType, pedidoType } = useCrearPedido()

    const location = useLocation()
    useEffect(() => {
        if (!location.search) return
        const search = location.search.replace('?', '')
        const searchFullType = pedidosType.find(type => type.id === search && type)
        handlePedidoType(searchFullType)
        return () => {
            handlePedidoType(null)
        }
    }, [handlePedidoType, location.search])

    return (
        <Card>
            <Card.Header>Tipo de solicitud</Card.Header>
            <Card.Body>
                {pedidosType.map(type => {
                    return (
                        <div
                            key={type.id}
                            className={`allType ${pedidoType?.id === type.id ? 'active' : ''}`}
                            onClick={() => handlePedidoType(type)}
                        >
                            <span className='material-icons'>{type.icon}</span>
                            <div className='allTypes-info'>
                                <p>{type.name}</p>
                                <p>{type.description}</p>
                            </div>
                        </div>
                    )
                })}
            </Card.Body>
        </Card>
    )
}

export default CrearPedidoType
