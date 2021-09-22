import React from 'react'

const PedidosListWeb = ({ pedidos, setPedido }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>Realizado</th>
                    <th>Autor</th>
                    <th>Tipo de pedido</th>
                    <th>Fecha de publicación</th>
                    <th>Observaciones</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido, i) => {
                    if (pedido.pedido === 'web')
                        return (
                            <tr key={i} onClick={() => setPedido(pedido)}>
                                <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
                                <td>{pedido.autor.autorName}</td>
                                <td>
                                    {pedido.type === 'noticia'
                                        ? 'Noticia Web'
                                        : pedido.type === 'crear'
                                        ? 'Crear contenido'
                                        : 'Modificar contenido'}
                                </td>
                                <td>{pedido.date.toDate().toLocaleDateString('en-GB')}</td>
                                <td className='truncate'>{pedido.observaciones}</td>
                                <td>{pedido.state === 'created' ? 'Creado' : ''}</td>
                            </tr>
                        )
                })}
            </tbody>
        </>
    )
}

export default PedidosListWeb
