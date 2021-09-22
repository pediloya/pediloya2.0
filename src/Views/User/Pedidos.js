import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePedidos } from '../../Context/PedidosContext'
/* import { useAuth } from '../../Context/AuthContext' */
import { Container, Card, Row, Col, Table, DropdownButton, Dropdown, Button } from 'react-bootstrap'
import { pedidosType } from '../../Assets/data'
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
    const { pedidos } = usePedidos()
    /* const { userType } = useAuth() */

    const [typeSelected, setTypeSelected] = useState(null)
    const [pedido, setPedido] = useState(null)
    const handleTypes = type => {
        if (type === typeSelected) return setTypeSelected(null)
        setTypeSelected(type)
    }

    const location = useLocation()
    useEffect(() => {
        if (!location.search) return
        console.log(location)
        const search = location.search.replace('?', '')
        console.log(search)
        setTypeSelected(search)
    }, [location])

    useEffect(() => {
        setPedido(null)
    }, [typeSelected])

    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Pedidos</h1>
                <p>Todos los pedidos de tu área en un mismo lugar</p>
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
                                El equipo de comunicación podrá cambiar el estado de "Creado" a "En curso" y una vez finalizado lo
                                cambiará a "Finalizado".
                            </small>
                        </p>
                        <p className='mb-0'>
                            <small>
                                Si considerás que el trabajo está listo podrás cambiarle el estado a "Cerrado", esto hará que se
                                deje de visualizar en esta página.
                            </small>
                        </p>
                        <p className='mb-0'>
                            <small>De esta forma evitamos que se acumulen muchos pedidos.</small>
                        </p>
                        <p>
                            <small>
                                *El pedido cambiará su estado a "Cerrado" autómaticamente luego de 7 días de haber sido
                                "Finalizado".
                            </small>
                        </p>
                        <div className='d-flex justify-content-between'>
                            <DropdownButton variant='primary' drop='down' id='dropdown-basic-button' title='Cambiar estado'>
                                <Dropdown.Item disabled={pedido.state !== 'finalized'}>Cerrado</Dropdown.Item>
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
