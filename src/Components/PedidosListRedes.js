import React from 'react'
import { useAuth } from '../Context/AuthContext'
import PedidoListRedesTRow from './PedidoListRedesTRow'

const PedidosListRedes = ({ pedidos, selectPedido, filter }) => {
    const { userType, currentUser } = useAuth()
    return (
        <>
            <thead>
                <tr className='text-nowrap'>
                    <th>Realizado</th>
                    {userType === 'admin' ? <th>Área</th> : <th>Autor</th>}
                    <th>Tipo de pedido</th>
                    <th>Fecha de publicación</th>
                    {userType === 'reparticion' && <th>Texto</th>}
                    {userType === 'admin' ? <th>Asignado a</th> : <th>Observaciones</th>}
                    {userType === 'admin' && <th>Estado</th>}
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido, i) => {
                    if (pedido.pedido !== 'redes') return
                    if (pedido.state === 'closed') return
                    if (filter) {
                        if (currentUser.uid === pedido.asignedTo?.currentUserId)
                            return (
                                <PedidoListRedesTRow
                                    key={pedido.id}
                                    pedido={pedido}
                                    filter={filter}
                                    selectPedido={selectPedido}
                                />
                            )
                    } else {
                        return <PedidoListRedesTRow key={pedido.id} pedido={pedido} filter={filter} selectPedido={selectPedido} />
                    }
                })}
            </tbody>
        </>
    )
}

export default PedidosListRedes
