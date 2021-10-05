import React, { useState, useEffect } from 'react'
import { usePedidos } from '../../Context/PedidosContext'
import { Container, Card, Row, Col, Table, Button } from 'react-bootstrap'
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
const PedidosCerrados = () => {
    const { pedidos } = usePedidos()

    const [typeSelected, setTypeSelected] = useState(null)
    const [pedido, setPedido] = useState(null)
    const [pedidosExpanded, setPedidosExpanded] = useState(true)

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
            if (pedido.state !== 'closed') return setPedido(null)
            if (pedido.id === ped.id) setPedido(ped)
        })
    }, [pedidos])

    useEffect(() => {
        setPedido(null)
    }, [typeSelected])

    const expandedPedidosTypeSelect = () => {
        if (pedidosExpanded) {
            localStorage.setItem('pedidosExpanded', false)
        } else {
            localStorage.setItem('pedidosExpanded', true)
        }
        setPedidosExpanded(pedidosExpanded => !pedidosExpanded)
    }

    useEffect(() => {
        if (!localStorage.getItem('pedidosExpanded')) return
        if (localStorage.getItem('pedidosExpanded') === 'true') return setPedidosExpanded(true)
        setPedidosExpanded(false)
    }, [])
    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Pedidos cerrados</h1>
                <p>Encontrá los pedidos que fueron cerrados</p>
            </div>
            <Row>
                <Col className='mb-3' lg={pedidosExpanded ? 3 : 1}>
                    <Card className={`pedidos ${pedidosExpanded ? 'expanded' : 'notExpanded'}`}>
                        <Card.Header>
                            <div className='d-flex justify-content-between w-100'>
                                <span className='cardTitleExpandable text-nowrap'>Hacé clic para ver el listado de pedidos</span>
                                <button
                                    onClick={() => {
                                        expandedPedidosTypeSelect()
                                    }}
                                    className='material-icons materialBtn'
                                    title='Contraer tarjeta'
                                >
                                    chevron_right
                                </button>
                            </div>
                        </Card.Header>
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
                <Col lg={pedidosExpanded ? 9 : 11} className='mb-3'>
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
                                <Table responsive='sm' bordered hover className='pedidosList'>
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
                        <PedidosDetailsState pedido={pedido} />
                        <Button as={Link} to={`/pedido/${pedido.id}`}>
                            Ver en página completa
                        </Button>
                    </Card.Body>
                </Card>
            ) : null}
        </Container>
    )
}

export default PedidosCerrados
