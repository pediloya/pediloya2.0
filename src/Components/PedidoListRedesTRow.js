import React from 'react'
import { useAuth } from '../Context/AuthContext'

const PedidoListRedesTRow = ({ pedido, selectPedido }) => {
    const { userType } = useAuth()
    return (
        <tr onClick={() => selectPedido(pedido)}>
            <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
            <td className='toUppercase'>{pedido.area}</td>
            <td>{pedido.type === 'facebook' ? 'Facebook' : pedido.type === 'twitter' ? 'Twitter' : 'Ambas'}</td>
            <td>{pedido.date.toDate().toLocaleDateString('en-GB')}</td>
            <td className='truncate'>{pedido.observaciones}</td>
            {userType === 'admin' ? (
                <td
                    className={
                        pedido.state === 'created'
                            ? 'created'
                            : pedido.state === 'inProgress'
                            ? 'inProgress'
                            : pedido.state === 'finalized'
                            ? 'finalized'
                            : pedido.state === 'closed' && 'closed'
                    }
                >
                    {pedido.state === 'created'
                        ? 'Creado'
                        : pedido.state === 'inProgress'
                        ? 'En curso'
                        : pedido.state === 'finalized'
                        ? 'Finalizado'
                        : pedido.state === 'closed' && 'Cerrado'}
                </td>
            ) : null}
        </tr>
    )
}

export default PedidoListRedesTRow
