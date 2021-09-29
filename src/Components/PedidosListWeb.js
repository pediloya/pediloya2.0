import React from 'react'
import { useAuth } from '../Context/AuthContext'
import PedidosListWebTRows from './PedidosListWebTRows'

const PedidosListWeb = ({ pedidos, selectPedido, filter }) => {
    const { userType, currentUser } = useAuth()

    return (
        <>
            <thead>
                <tr className='text-nowrap'>
                    <th>Realizado</th>
                    {userType === 'admin' ? <th>Área</th> : <th>Autor</th>}
                    <th>Tipo de pedido</th>
                    <th>Fecha de publicación</th>
                    {userType === 'admin' ? <th>Asignado a</th> : <th>Observaciones</th>}

                    {userType === 'admin' && <th>Estado</th>}
                </tr>
            </thead>
            <tbody>
                {pedidos.map(pedido => {
                    if (pedido.pedido !== 'web') return
                    if (pedido.state === 'closed') return
                    if (filter) {
                        if (currentUser.uid === pedido.asignedTo?.currentUserId)
                            return (
                                <PedidosListWebTRows
                                    key={pedido.id}
                                    pedido={pedido}
                                    filter={filter}
                                    selectPedido={selectPedido}
                                />
                            )
                    } else {
                        return <PedidosListWebTRows key={pedido.id} pedido={pedido} filter={filter} selectPedido={selectPedido} />
                    }
                })}
            </tbody>
        </>
    )
}

export default PedidosListWeb
