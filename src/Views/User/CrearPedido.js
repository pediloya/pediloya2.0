import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useCrearPedido } from '../../Context/CrearPedidoContext'
import CrearPedidoType from '../../Components/CrearPedidoType'
import CrearPedidoInnerType from '../../Components/CrearPedidoInnerType'

import { TeamNotificationsProvider } from '../../Context/TeamNotificationsContext'

const CrearPedido = () => {
    const { pedidoType } = useCrearPedido()

    return (
        <TeamNotificationsProvider>
            <Container fluid as='main'>
                <div className='mainIntro'>
                    <h1>Crear pedido</h1>
                    <p>Creá una solicitud para el equipo de comunicación</p>
                </div>
                <Row>
                    <Col className='mb-3' lg={3}>
                        <CrearPedidoType />
                    </Col>

                    {pedidoType && <CrearPedidoInnerType pedidoType={pedidoType} />}
                </Row>
            </Container>
        </TeamNotificationsProvider>
    )
}

export default CrearPedido
