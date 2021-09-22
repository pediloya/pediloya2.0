import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import QuantityPreview from './QuantityPreview'
import Loading from './Loading'

const PedidosPreview = ({ pedidos }) => {
    const [pedidosRedes, setPedidosRedes] = useState([])
    const [pedidosDisenio, setPedidosDisenio] = useState([])
    const [pedidosSomos, setPedidosSomos] = useState([])
    const [pedidosWeb, setPedidosWeb] = useState([])

    useEffect(() => {
        if (pedidos.length === 0) return
        if (pedidos[0].empty) return
        pedidos.forEach(pedido => {
            if (pedido.pedido === 'redes' && pedido.state !== 'closed') setPedidosRedes(prevState => [...prevState, pedido])
            if (pedido.pedido === 'disenio' && pedido.state !== 'closed') setPedidosDisenio(prevState => [...prevState, pedido])
            if (pedido.pedido === 'web' && pedido.state !== 'closed') setPedidosWeb(prevState => [...prevState, pedido])
            if (pedido.pedido === 'somos' && pedido.state !== 'closed') setPedidosSomos(prevState => [...prevState, pedido])
        })
    }, [pedidos])

    return (
        <>
            <Row className='homeQuantity'>
                <QuantityPreview type={'Diseño'} icon={'edit'} number={pedidosDisenio.length} search='disenio' />
                <QuantityPreview type={'Web'} icon={'computer'} number={pedidosWeb.length} search='web' />
                <QuantityPreview type={'Redes'} icon={'facebook'} number={pedidosRedes.length} search='redes' />
                <QuantityPreview type={'Somos'} icon={'email'} number={pedidosSomos.length} search='somos' />
            </Row>
        </>
    )
}

export default PedidosPreview
