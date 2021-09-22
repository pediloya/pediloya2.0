import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

const QuantityPreview = ({ type, icon, number, search }) => {
    const { userType } = useAuth()

    return (
        <Col md={3} sm={6}>
            <p>
                <span className='material-icons'>{icon}</span> {type}
            </p>
            <p>
                {userType === 'reparticion' && (
                    <Link to={`/crear-pedidos?${search}`}>
                        <span className='material-icons'>note_add</span>
                    </Link>
                )}
                <Link to={`/pedidos?${search}`}>
                    <span className='material-icons'>pageview</span>
                </Link>
            </p>
            <p>Pedidos: {number}</p>
        </Col>
    )
}

export default QuantityPreview
