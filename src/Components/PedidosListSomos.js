import React from 'react'
import { useAuth } from '../Context/AuthContext'
import PedidosListSomosTRow from './PedidosListSomosTRow'

const PedidosListSomos = ({ pedidos, selectPedido, filter, pedidosOpen }) => {
    const { userType, currentUser } = useAuth()

    return (
        <>
            <thead>
                <tr className='text-nowrap'>
                    <th>Realizado</th>
                    {userType === 'admin' ? <th>Área</th> : <th>Autor</th>}
                    <th>Sección</th>
                    {userType === 'admin' ? <th>Asignado a</th> : <th>Observaciones</th>}
                    {userType === 'admin' ? <th>Estado</th> : null}
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido, i) => {
                    if (pedido.pedido !== 'somos') return
                    if (pedido.state === 'closed') return
                    if (pedidosOpen) {
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
                                <PedidosListSomosTRow
                                    key={pedido.id}
                                    pedido={pedido}
                                    filter={filter}
                                    selectPedido={selectPedido}
                                />
                            )
                        }
                    } else {
                        if (pedido.state === 'closed')
                            return (
                                <PedidosListSomosTRow
                                    key={pedido.id}
                                    pedido={pedido}
                                    filter={filter}
                                    selectPedido={selectPedido}
                                />
                            )
                    }
                })}
            </tbody>
        </>
    )
}

export default PedidosListSomos
