import React from 'react'
import { Table } from 'react-bootstrap'

const PedidoDetailsAutor = ({ pedido }) => {
    const { createAt } = pedido
    const day = createAt.toDate().toLocaleDateString('en-GB')
    const hour = createAt.toDate().getHours()
    const minutes = createAt.toDate().getMinutes()
    return (
        <>
            <p>Creado el {`${day} a las ${hour}:${minutes} hs.`}</p>
            <Table bordered responsive='sm' hover className='w-auto'>
                <thead>
                    <tr>
                        <th colSpan='2'>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Área: </td>
                        <td>
                            <span className='toUppercase bold'>{pedido.area}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre: </td>
                        <td>
                            <span className='bold'>{pedido.autor.autorName}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Correo Electrónico:</td>
                        <td>
                            <a href={`mailto:${pedido.autor.autorEmail}`} rel='noreferrer' target='_blank'>
                                {pedido.autor.autorEmail}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Correos Electrónicos en Copia:</td>
                        <td>
                            {pedido.autor.emailsToCopy.map((e, i) => {
                                return pedido.autor.emailsToCopy.length === i + 1 ? (
                                    <a key={i + e} href={`mailto:${e}`} target='_blank' rel='noreferrer'>
                                        {e}
                                    </a>
                                ) : (
                                    <React.Fragment key={i + e}>
                                        <a key={i + e} href={`mailto:${e}`} target='_blank' rel='noreferrer'>
                                            {e}
                                        </a>
                                        ,{' '}
                                    </React.Fragment>
                                )
                            })}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default PedidoDetailsAutor
