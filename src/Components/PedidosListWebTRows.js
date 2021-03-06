import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { isMoreThanOneUrl, isValidURL } from '../Assets/Regex'

const PedidosListWebTRows = ({ pedido, selectPedido }) => {
    const { userType } = useAuth()

    return (
        <tr onClick={() => selectPedido(pedido)}>
            <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
            {userType === 'admin' ? <td className='toUppercase'>{pedido.area}</td> : <td>{pedido.autor.autorName}</td>}
            <td>
                {pedido.type === 'noticia' ? 'Noticia Web' : pedido.type === 'crear' ? 'Crear contenido' : 'Modificar contenido'}
            </td>
            <td className='bold'>{pedido.date.toDate().toLocaleDateString('en-GB')}</td>
            {userType === 'reparticion' ? (
                pedido.changes ? (
                    <td>
                        {isValidURL(pedido.changes) ? (
                            isMoreThanOneUrl(pedido.changes) ? (
                                pedido.changes.split(/[,;]+/).map(url => {
                                    return (
                                        <a href={url} target='_blank' rel='noreferrer'>
                                            {url}
                                        </a>
                                    )
                                })
                            ) : (
                                <a href={pedido.changes} target='_blank' title='enlace'>
                                    Enlace
                                </a>
                            )
                        ) : (
                            pedido.changes
                        )}
                    </td>
                ) : (
                    <td>{pedido.title ? pedido.title : pedido.linkToContent}</td>
                )
            ) : null}
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

export default PedidosListWebTRows
