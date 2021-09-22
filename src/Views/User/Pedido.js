import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import { usePedidos } from '../../Context/PedidosContext'
import Loading from '../../Components/Loading'
import PedidoDetails from '../../Components/PedidoDetails'

const Pedido = () => {
    const { pedidos } = usePedidos()
    const [pedido, setPedido] = useState(null)

    const params = useParams()

    useEffect(() => {
        setPedido(pedidos.find(p => params.id === p.id))
    }, [params.id, pedidos])

    return (
        <Container fluid as='main'>
            <div className='mainIntro'>
                <h1>Detalles del Pedido</h1>
            </div>

            {!pedido ? <Loading /> : <PedidoDetails pedido={pedido} />}
        </Container>
    )
}

export default Pedido
