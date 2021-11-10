import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import QuantityPreview from './QuantityPreview'
import Loading from './Loading'

const PedidosPreview = ({ pedidos }) => {
    const [pedidosRedes, setPedidosRedes] = useState([])
    const [pedidosDisenio, setPedidosDisenio] = useState([])
    const [pedidosWeb, setPedidosWeb] = useState([])
    const [pedidosSomos, setPedidosSomos] = useState([])

    useEffect(() => {
        console.log('pedidos de diseño => ', pedidosDisenio)
        console.log('length pedidos de diseño => ', pedidosDisenio.length)
    }, [pedidosDisenio])

    useEffect(() => {
        if (pedidos.length === 0) return
        if (pedidos[0].empty) return
        pedidos.forEach(pedido => {
            if (!pedido.id) return
            if (pedido.pedido === 'redes' && pedido.state !== 'closed') {
                if (pedidosRedes.find(ped => ped.id === pedido.id)) return
                setPedidosRedes(pedidosRedes => [...pedidosRedes, pedido])
            }
            if (pedido.pedido === 'disenio' && pedido.state !== 'closed') {
                console.log(pedido.id)

                if (pedidosDisenio.find(ped => ped.id === pedido.id)) return
                setPedidosDisenio(pedidosDisenio => [...pedidosDisenio, pedido])
            }
            if (pedido.pedido === 'web' && pedido.state !== 'closed') {
                if (pedidosWeb.find(ped => ped.id === pedido.id)) return
                setPedidosWeb(pedidosWeb => [...pedidosWeb, pedido])
            }
            if (pedido.pedido === 'somos' && pedido.state !== 'closed') {
                if (pedidosSomos.find(ped => ped.id === pedido.id)) return
                setPedidosSomos(pedidosSomos => [...pedidosSomos, pedido])
            }
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
