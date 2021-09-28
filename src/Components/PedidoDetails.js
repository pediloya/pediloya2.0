import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { Card, Table, Button } from 'react-bootstrap'

import PedidoDetailsAutor from './PedidoDetailsAutor'
import PedidoDetailsDisenio from './PedidoDetailsDisenio'
import PedidoDetailsWeb from './PedidoDetailsWeb'
import PedidoDetailsSomos from './PedidoDetailsSomos'
import PedidoDetailsRedes from './PedidoDetailsRedes'
import PedidosDetailsState from './PedidosDetailsState'
import AsignPedidos from './AsignPedidos'

const PedidoDetails = ({ pedido }) => {
    const { userType } = useAuth()

    return (
        <>
            <Card className='pedidoDetails'>
                <Card.Header>
                    {`${
                        pedido.pedido === 'redes'
                            ? 'Pedido de publicación en Redes'
                            : pedido.pedido === 'web'
                            ? 'Web GCBA'
                            : pedido.pedido === 'somos'
                            ? 'Noticia para Somos'
                            : pedido.pedido === 'disenio'
                            ? 'Pedido de Diseño'
                            : ''
                    }`}
                </Card.Header>
                <Card.Body>
                    <PedidoDetailsAutor pedido={pedido} />
                    <Table bordered hover responsive='sm' className='w-auto'>
                        {pedido.pedido === 'disenio' ? (
                            <PedidoDetailsDisenio pedido={pedido} />
                        ) : pedido.pedido === 'web' ? (
                            <PedidoDetailsWeb pedido={pedido} />
                        ) : pedido.pedido === 'somos' ? (
                            <PedidoDetailsSomos pedido={pedido} />
                        ) : (
                            pedido.pedido === 'redes' && <PedidoDetailsRedes pedido={pedido} />
                        )}
                    </Table>
                    {userType === 'admin' && (
                        <>
                            <PedidosDetailsState pedido={pedido} />
                            <AsignPedidos pedido={pedido} />
                            <Button className='btn btn-primary btnMarginR' as={Link} to={`/pedido/${pedido.id}`}>
                                Ver en página completa
                            </Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </>
    )
}

export default PedidoDetails
