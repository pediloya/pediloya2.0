import React from 'react'
import { useAuth } from '../Context/AuthContext'

const PedidosListWebTRows = ({ pedido, selectPedido }) => {
    const { userType } = useAuth()

    return (
        <tr onClick={() => selectPedido(pedido)}>
            <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
            <td className='toUppercase'>{pedido.area}</td>
            <td>
                {pedido.type === 'noticia' ? 'Noticia Web' : pedido.type === 'crear' ? 'Crear contenido' : 'Modificar contenido'}
            </td>
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

export default PedidosListWebTRows
