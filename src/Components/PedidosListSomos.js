import React from 'react'

const PedidosListSomos = ({ pedidos, setPedido }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>Realizado</th>
                    <th>Autor</th>
                    <th>Sección</th>
                    <th>Observaciones</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido, i) => {
                    if (pedido.pedido === 'somos')
                        return (
                            <tr key={i} onClick={() => setPedido(pedido)}>
                                <td>{pedido.createAt.toDate().toLocaleDateString('en-GB')}</td>
                                <td>{pedido.autor.autorName}</td>
                                <td>
                                    {pedido.type === 'NoTeLoPierdas'
                                        ? 'No te lo pierdas'
                                        : pedido.type === 'EntreNos'
                                        ? 'Entre Nos'
                                        : 'Te enteraste'}
                                </td>
                                <td className='truncate'>{pedido.observaciones}</td>
                                <td>{pedido.state === 'created' ? 'Creado' : ''}</td>
                            </tr>
                        )
                })}
            </tbody>
        </>
    )
}

export default PedidosListSomos
