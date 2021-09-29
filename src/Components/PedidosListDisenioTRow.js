import React from 'react'
import { useAuth } from '../Context/AuthContext'

const PedidosListDisenioTRow = ({ pedido, selectPedido, filter }) => {
    const { userType, currentUser } = useAuth()
    return (
        <tr onClick={() => selectPedido(pedido)}>
            <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
            {userType === 'admin' ? <td className='toUppercase'>{pedido.area}</td> : <td>{pedido.autor.autorName}</td>}
            <td>{pedido.date.toDate().toLocaleDateString('en-GB')}</td>
            <td className='text-nowrap'>
                {pedido.type === 'digital' ? 'Pieza Digital' : pedido.type === 'impresa' ? 'Pieza Impresa' : 'Ambas'}
            </td>
            <td>{pedido.specs}</td>
            {userType === 'admin' ? <td>{pedido.asignedTo?.userName}</td> : <td>{pedido.observaciones}</td>}
            {userType === 'admin' && (
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
            )}
        </tr>
    )
}

export default PedidosListDisenioTRow
