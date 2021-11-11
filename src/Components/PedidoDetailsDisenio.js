import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { isMoreThanOneUrl, isValidURL } from '../Assets/Regex'

const PedidoDetailsDisenio = ({ pedido }) => {
    const { userType } = useAuth()

    return (
        <>
            <thead>
                <tr>
                    <th colSpan='2'>Pedido</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tipo de Pieza:</td>
                    <td>
                        {pedido.type === 'impresa'
                            ? 'Pieza Impresa'
                            : pedido.type === 'digital'
                            ? 'Pieza Digital'
                            : pedido.type === 'ambas'
                            ? 'Ambas'
                            : null}
                    </td>
                </tr>
                <tr>
                    <td>Fecha de entrega:</td>
                    <td>
                        <span className='bold'>{pedido.formatedDate}</span>
                    </td>
                </tr>
                <tr>
                    <td>Especificaciones:</td>
                    <td>{pedido.specs}</td>
                </tr>
                <tr>
                    <td>Texto para la pieza:</td>
                    <td>
                        {isValidURL(pedido.text) ? (
                            isMoreThanOneUrl(pedido.text) ? (
                                pedido.text.split(/[,;]+/).map(url => {
                                    return (
                                        <a href={url} target='_blank' rel='noreferrer'>
                                            {url}
                                        </a>
                                    )
                                })
                            ) : (
                                <a href={pedido.text} target='_blank' rel='noreferrer'>
                                    {pedido.text}
                                </a>
                            )
                        ) : (
                            pedido.text
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Imágenes:</td>
                    <td>
                        {isMoreThanOneUrl(pedido.img) ? (
                            pedido.img.split(/[,;]+/).map(url => {
                                return (
                                    <a href={url} target='_blank' rel='noreferrer'>
                                        {url}
                                    </a>
                                )
                            })
                        ) : (
                            <a href={pedido.img} target='_blank' rel='noreferrer'>
                                {pedido.img}
                            </a>
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Observaciones:</td>
                    <td>{pedido.observaciones.toString()}</td>
                </tr>
                {userType === 'admin' && pedido.asignedTo && (
                    <tr>
                        <td>Asignado a:</td>
                        <td>{pedido.asignedTo.userName}</td>
                    </tr>
                )}
            </tbody>
        </>
    )
}

export default PedidoDetailsDisenio
