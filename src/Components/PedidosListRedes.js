import React from 'react'
import { useAuth } from '../Context/AuthContext'
import PedidoListRedesTRow from './PedidosListDisenioTRow'

const PedidosListRedes = ({ pedidos, selectPedido, filter }) => {
    const { userType, currentUser } = useAuth()
    return (
        <>
            <thead>
                <tr>
                    <th>Realizado</th>
                    <th>Área</th>
                    <th>Tipo de pedido</th>
                    <th>Fecha de publicación</th>
                    <th>Observaciones</th>
                    {userType === 'admin' ? <th>Estado</th> : null}
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
