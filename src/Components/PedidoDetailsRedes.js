import React from 'react'
import { isValidURL, isMoreThanOneUrl } from '../Assets/Regex'

const PedidoDetailsRedes = ({ pedido }) => {
    return (
        <>
            <thead>
                <tr>
                    <th colSpan='2'>Pedido</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Publicar en: </td>
                    <td>
                        {pedido.type === 'facebook'
                            ? 'Facebook'
                            : pedido.type === 'twitter'
                            ? 'Twitter'
                            : pedido.type === 'ambas' && 'Ambas'}
                    </td>
                </tr>
                <tr>
                    <td>Fecha de publicación: </td>
                    <td className='bold'>{pedido.formatedDate}</td>
                </tr>
                <tr>
                    <td>Texto para la publicación</td>
                    <td>
                        {isValidURL(pedido.text) ? (
                            <a href={pedido.text} target='_blank' rel='noreferrer'>
                                {pedido.text}
                            </a>
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
                    <td>Observaciones: </td>
                    <td>{pedido.observaciones}</td>
                </tr>
            </tbody>
        </>
    )
}

export default PedidoDetailsRedes
