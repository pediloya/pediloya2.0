import React from 'react'
import { isMoreThanOneUrl, isValidURL } from '../Assets/Regex'

const PedidoDetailsSomos = ({ pedido }) => {
    return (
        <>
            <thead>
                <tr>
                    <th colSpan='2'>Pedido</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Sección: </td>
                    <td>
                        {pedido.type === 'NoTeLoPierdas'
                            ? 'No te lo pierdas'
                            : pedido.type === 'EntreNos'
                            ? 'Entre Nos'
                            : pedido.type === 'TeEnteraste' && 'Te enteraste'}
                    </td>
                </tr>
                {pedido.title && (
                    <tr>
                        <td>Titulo para la noticia: </td>
                        <td>{pedido.title}</td>
                    </tr>
                )}
                <tr>
                    <td>Texto para la noticia: </td>
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
                    <td>Imágenes: </td>
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
                    <td>Observaciones</td>
                    <td>{pedido.observaciones}</td>
                </tr>
            </tbody>
        </>
    )
}

export default PedidoDetailsSomos
