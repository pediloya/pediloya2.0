import React from 'react'

const PedidosListDisenio = ({ pedidos, setPedido }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>Realizado</th>
                    <th>Autor</th>
                    <th>Tipo de pedido</th>
                    <th>Fecha de entrega</th>
                    <th>Observaciones</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido, i) => {
                    if (pedido.pedido === 'disenio')
                        return (
                            <tr key={i} onClick={() => setPedido(pedido)}>
                                <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
                                <td>{pedido.autor.autorName}</td>
                                <td>
                                    {pedido.type === 'digital'
                                        ? 'Pieza Digital'
                                        : pedido.type === 'impresa'
                                        ? 'Pieza Impresa'
                                        : 'Ambas'}
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

export default PedidosListDisenio
