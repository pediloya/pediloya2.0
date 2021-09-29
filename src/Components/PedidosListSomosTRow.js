import React from 'react'
import { useAuth } from '../Context/AuthContext'

const PedidosListSomosTRow = ({ pedido, selectPedido }) => {
    const { userType } = useAuth()
    return (
        <tr onClick={() => selectPedido(pedido)}>
            <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
            {userType === 'admin' ? <td className='toUppercase'>{pedido.area}</td> : <td>{pedido.autor.autorName}</td>}
            <td className='text-nowrap'>
                {pedido.type === 'NoTeLoPierdas' ? 'No te lo pierdas' : pedido.type === 'EntreNos' ? 'Entre Nos' : 'Te enteraste'}
            </td>
            {userType === 'admin' ? <td>{pedido.asignedTo?.userName}</td> : <td>{pedido.observaciones}</td>}
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

export default PedidosListSomosTRow
