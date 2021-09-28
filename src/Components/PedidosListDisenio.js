import React from 'react'
import { useAuth } from '../Context/AuthContext'
import PedidosListDisenioTRow from './PedidosListDisenioTRow'

const PedidosListDisenio = ({ pedidos, selectPedido, filter }) => {
    const { userType, currentUser } = useAuth()

    return (
        <>
            <thead>
                <tr>
                    <th>Realizado</th>
                    <th>Área</th>
                    <th>Fecha de entrega</th>
                    <th>Tipo de pedido</th>
                    <th>Especificaciones</th>
                    {userType === 'admin' ? <th>Estado</th> : null}
                </tr>
            </thead>
            <tbody>
                {pedidos.map(pedido => {
                    if (pedido.pedido !== 'disenio') return
                    if (pedido.state === 'closed') return
                    if (filter) {
                        if (currentUser.uid === pedido.asignedTo?.currentUserId)
                            return (
                                <PedidosListDisenioTRow
                                    key={pedido.id}
                                    pedido={pedido}
                                    filter={filter}
                                    selectPedido={selectPedido}
                                />
                            )
                    } else {
                        return (
                            <PedidosListDisenioTRow key={pedido.id} pedido={pedido} filter={filter} selectPedido={selectPedido} />
                        )
                    }
                })}
            </tbody>
        </>
    )
}

export default PedidosListDisenio
