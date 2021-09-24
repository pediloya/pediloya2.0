import React, { useState, useEffect } from 'react'
import { useAllPedidos } from '../../Context/AllPedidosContext'
import { Link, useLocation } from 'react-router-dom'
import { pedidosType } from '../../Assets/data'
import { Container, Row, Col, Card, Table, DropdownButton, Dropdown, Button } from 'react-bootstrap'

import PedidosListDisenio from '../../Components/PedidosListDisenio'
import PedidosListWeb from '../../Components/PedidosListWeb'
import PedidosListRedes from '../../Components/PedidosListRedes'
import PedidosListSomos from '../../Components/PedidosListSomos'
import PedidoDetailsAutor from '../../Components/PedidoDetailsAutor'
import PedidoDetailsDisenio from '../../Components/PedidoDetailsDisenio'
import PedidoDetailsWeb from '../../Components/PedidoDetailsWeb'
import PedidoDetailsRedes from '../../Components/PedidoDetailsRedes'
import PedidoDetailsSomos from '../../Components/PedidoDetailsSomos'

const Pedidos = () => {
    const { pedidos } = useAllPedidos()
    const [typeSelected, setTypeSelected] = useState(null)
    const [pedido, setPedido] = useState(null)

    const handleTypes = type => {
        if (type === typeSelected) return setTypeSelected(null)
        setTypeSelected(type)
    }

    useEffect(() => {
        setPedido(null)
    }, [typeSelected])

    const location = useLocation()
    useEffect(() => {
        if (!location.search) return
        /* console.log(location) */
        const search = location.search.replace('?', '')
        /* console.log(search) */
        setTypeSelected(search)
    }, [location])

    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Pedidos</h1>
                <p>Llevá el seguimiento de los pedidos realizados al área de comunicación del Ministerio</p>
            </div>
            <Row>
                <Col className='mb-3' lg={3}>
                    <Card className='pedidos'>
                        <Card.Header>Hacé clic para ver el listado de pedidos</Card.Header>
                        <Card.Body>
                            <div className='allTypes'>
                                {pedidosType.map((type, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={`allType ${typeSelected === type.id ? 'active' : ''}`}
                                            onClick={() => handleTypes(type.id)}
                                        >
                                            <span className='material-icons'>{type.icon}</span>
                                            <div className='allTypes-info'>
                                                <p>{type.name}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='mb-3'>
                    {typeSelected && (
                        <Card>
                            <Card.Header>
                                {typeSelected === 'disenio'
                                    ? 'Pedidos de Diseño'
                                    : typeSelected === 'web'
                                    ? 'Pedido Web GCBA'
                                    : typeSelected === 'redes'
                                    ? 'Pedido de publicación en Redes'
                                    : typeSelected === 'somos' && 'Noticia para Somos'}
                            </Card.Header>
                            <Card.Body>
                                <Table bordered hover className='pedidosList' size='sm'>
                                    {typeSelected === 'disenio' ? (
                                        <PedidosListDisenio pedidos={pedidos} setPedido={setPedido} />
                                    ) : typeSelected === 'web' ? (
                                        <PedidosListWeb pedidos={pedidos} setPedido={setPedido} />
                                    ) : typeSelected === 'redes' ? (
                                        <PedidosListRedes pedidos={pedidos} setPedido={setPedido} />
                                    ) : (
                                        typeSelected === 'somos' && <PedidosListSomos pedidos={pedidos} setPedido={setPedido} />
                                    )}
                                </Table>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
            {pedido ? (
                <Card className='pedidosListDetailsCard'>
                    <Card.Header>
                        <span className='material-icons pedidosListDetailsCardDismiss' onClick={() => setPedido(null)}>
                            cancel
                        </span>
                        Detalles del pedido
                    </Card.Header>
                    <Card.Body>
                        <PedidoDetailsAutor pedido={pedido} />
                        <Table bordered hover responsive='sm' className='w-auto pedidoDetails'>
                            {pedido.pedido === 'disenio' ? (
                                <PedidoDetailsDisenio pedido={pedido} />
                            ) : pedido.pedido === 'redes' ? (
                                <PedidoDetailsRedes pedido={pedido} />
                            ) : pedido.pedido === 'web' ? (
                                <PedidoDetailsWeb pedido={pedido} />
                            ) : (
                                pedido.pedido === 'somos' && <PedidoDetailsSomos pedido={pedido} />
                            )}
                        </Table>
                        <p className='mb-0'>Estado del pedido:</p>
                        <p>
                            <strong>
                                {pedido.state === 'created'
                                    ? 'Creado'
                                    : pedido.state === 'inProgress'
                                    ? 'En curso'
                                    : pedido.state === 'finalized'
                                    ? 'Finalizado'
                                    : pedido.state === 'closed' && 'Cerrado'}
                            </strong>
                        </p>
                        <p className='mb-0'>
                            <small>
                                Cuando el área realiza un pedido, el estado será "Creado", si ya empezaste a trabajar en el mismo
                                cambialo a "En curso".
                            </small>
                        </p>
                        <p className='mb-0'>
                            <small>
                                Una vez entregado, cambiale el estado a "Finalizado", si el área está conforme con el trabajo
                                deberá cambiarle el estado a "Cerrado"
                            </small>
                        </p>
                        <p className='mb-0'>
                            <small>De esta forma evitamos que se acumulen muchos pedidos en esta página.</small>
                        </p>
                        <p>
                            <small>
                                *El pedido cambiará su estado a "Cerrado" autómaticamente luego de 7 días de haber sido
                                "Finalizado".
                            </small>
                        </p>
                        <div className='d-flex justify-content-between'>
                            <DropdownButton variant='primary' drop='down' id='dropdown-basic-button' title='Cambiar estado'>
                                <Dropdown.Item disabled={pedido.state !== 'created'}>En curso</Dropdown.Item>
                                <Dropdown.Item disabled={pedido.state !== 'finalized'}>Finalizado</Dropdown.Item>
                            </DropdownButton>
                            <Button to={`/pedido/${pedido.id}`} as={Link}>
                                Abrir en página
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ) : null}
        </Container>
    )
}

export default Pedidos
