import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePedidos } from '../../Context/PedidosContext'
import { Container, Card, Row, Col, Table } from 'react-bootstrap'
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
import PedidosDetailsState from '../../Components/PedidosDetailsState'

const Pedidos = () => {
    const { pedidos } = usePedidos()

    const [typeSelected, setTypeSelected] = useState(null)
    const [pedido, setPedido] = useState(null)

    const handleTypes = type => {
        if (type === typeSelected) return setTypeSelected(null)
        setTypeSelected(type)
    }

    const selectPedido = pedido => {
        setPedido(pedido)
    }

    useEffect(() => {
        if (!pedido) return
        pedidos.map(ped => {
            if (pedido.state === 'closed') return setPedido(null)
            if (pedido.id === ped.id) setPedido(ped)
        })
    }, [pedidos])

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
                                <Table responsive='sm' bordered hover className='pedidosList' size='sm'>
                                    {typeSelected === 'disenio' ? (
                                        <PedidosListDisenio pedidos={pedidos} selectPedido={selectPedido} />
                                    ) : typeSelected === 'web' ? (
                                        <PedidosListWeb pedidos={pedidos} selectPedido={selectPedido} />
                                    ) : typeSelected === 'redes' ? (
                                        <PedidosListRedes pedidos={pedidos} selectPedido={selectPedido} />
                                    ) : (
                                        typeSelected === 'somos' && (
                                            <PedidosListSomos pedidos={pedidos} selectPedido={selectPedido} />
                                        )
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
                        {/* <PedidosDetailsState pedido={pedido} /> 
                        <AsignPedidos pedido={pedido} />
                        <Button as={Link} to={`/pedido/${pedido.id}`}>
                            Ver en página completa
                        </Button>
                        */}
                    </Card.Body>
                </Card>
            ) : null}
        </Container>
    )
}

export default Pedidos
