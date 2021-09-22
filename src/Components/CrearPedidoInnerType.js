import React, { lazy, Suspense } from 'react'
import { Col, Card } from 'react-bootstrap'
import Loading from './Loading'

const CrearPedidoInnerDisenio = lazy(() => import('./CrearPedidoInnerDisenio'))
const CrearPedidoInnerWeb = lazy(() => import('./CrearPedidoInnerWeb'))
const CrearPedidoInnerRedes = lazy(() => import('./CrearPedidoInnerRedes'))
const CrearPedidoInnerSomos = lazy(() => import('./CrearPedidoInnerSomos'))

const CrearPedidoInnerType = ({ pedidoType }) => {
    return (
        <Col lg={7}>
            <Card className='secondsStep'>
                <Card.Header>{pedidoType.name}</Card.Header>
                <Card.Body>
                    <Suspense fallback={<Loading />}>
                        {pedidoType.id === 'disenio' && <CrearPedidoInnerDisenio />}
                        {pedidoType.id === 'web' && <CrearPedidoInnerWeb />}
                        {pedidoType.id === 'redes' && <CrearPedidoInnerRedes />}
                        {pedidoType.id === 'somos' && <CrearPedidoInnerSomos />}
                    </Suspense>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CrearPedidoInnerType
