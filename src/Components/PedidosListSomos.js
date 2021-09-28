import React from 'react'
import { useAuth } from '../Context/AuthContext'
import PedidosListSomosTRow from './PedidosListSomosTRow'

const PedidosListSomos = ({ pedidos, selectPedido, filter }) => {
    const { userType, currentUser } = useAuth()

    return (
        <>
            <thead>
                <tr>
                    <th>Realizado</th>
                    <th>Área</th>
                    <th>Sección</th>
                    <th>Observaciones</th>
                    {userType === 'admin' ? <th>Estado</th> : null}
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido, i) => {
                    if (pedido.pedido !== 'somos') return
                    if (pedido.state === 'closed') return
                    if (filter) {
                        if (currentUser.uid === pedido.asignedTo?.currentUserId)
                            return (
                                <PedidosListSomosTRow
                                    key={pedido.id}
                                    pedido={pedido}
                                    filter={filter}
                                    selectPedido={selectPedido}
                                />
                            )
                    } else {
                        return (
                            <PedidosListSomosTRow key={pedido.id} pedido={pedido} filter={filter} selectPedido={selectPedido} />
                        )
                    }
                })}
            </tbody>
        </>
    )
}

export default PedidosListSomos
